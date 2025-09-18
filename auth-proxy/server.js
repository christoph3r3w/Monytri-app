/**
 * Per-tab Authentication Proxy for Appwrite
 * Enables multiple users to be logged in simultaneously in different tabs
 */

import express from 'express';
import cors from 'cors';
import { Client, Account, ID } from 'node-appwrite';
import { PUBLIC_APPWRITE_PROJECT_ID,PUBLIC_APPWRITE_ENDPOINT } from '$env/static/public';


const app = express();
const port = process.env.PORT || 3003;

// Enable CORS for your Svelte app
app.use(cors({
    origin: [
        'http://localhost:5173', 
        'http://localhost:4173',
        'http://localhost:3003',
        'https://monytri.app',
         // Add your Netlify domain here
        process.env.FRONTEND_URL // Allow dynamic frontend URL from environment
    ], 
    credentials: true
}));

app.use(express.json());

// Store session clients per tab token
const sessionClients = new Map();

// Create a new Appwrite client for a tab session
function createClientForTab(tabToken) {
    if (sessionClients.has(tabToken)) {
        return sessionClients.get(tabToken);
    }

    const client = new Client()
        .setEndpoint(PUBLIC_APPWRITE_ENDPOINT )
        .setProject(PUBLIC_APPWRITE_PROJECT_ID ); // Your project ID

    const account = new Account(client);
    
    const sessionData = {
        client,
        account,
        user: null,
        sessionId: null
    };

    sessionClients.set(tabToken, sessionData);
    return sessionData;
}

// Generate a unique tab token
function generateTabToken() {
    return `tab_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
}

// Get or create tab token from request
function getTabToken(req) {
    return req.headers['x-tab-token'] || req.query.tabToken;
}

// Login endpoint
app.post('/auth/login', async (req, res) => {
    try {
        const { email, password } = req.body;
        const tabToken = req.headers['x-tab-token'] || generateTabToken();
        
        const sessionData = createClientForTab(tabToken);
        
        // Create session for this tab
        const session = await sessionData.account.createEmailPasswordSession(email, password);
        sessionData.sessionId = session.$id;
        
        // Get user data
        const userData = await sessionData.account.get();
        sessionData.user = userData;
        
        res.json({
            success: true,
            tabToken,
            user: userData,
            sessionId: session.$id
        });
    } catch (error) {
        console.error('Login error:', error);
        res.status(401).json({
            success: false,
            error: error.message || 'Login failed'
        });
    }
});

// Logout endpoint
app.post('/auth/logout', async (req, res) => {
    try {
        const tabToken = getTabToken(req);
        
        if (!tabToken || !sessionClients.has(tabToken)) {
            return res.status(400).json({
                success: false,
                error: 'No active session found'
            });
        }
        
        const sessionData = sessionClients.get(tabToken);
        
        // Delete the session
        if (sessionData.sessionId) {
            await sessionData.account.deleteSession(sessionData.sessionId);
        }
        
        // Clean up
        sessionClients.delete(tabToken);
        
        res.json({ success: true });
    } catch (error) {
        console.error('Logout error:', error);
        res.status(500).json({
            success: false,
            error: error.message || 'Logout failed'
        });
    }
});

// Get current user endpoint
app.get('/auth/user', async (req, res) => {
    try {
        const tabToken = getTabToken(req);
        
        if (!tabToken || !sessionClients.has(tabToken)) {
            return res.status(401).json({
                success: false,
                error: 'No active session'
            });
        }
        
        const sessionData = sessionClients.get(tabToken);
        
        // Refresh user data
        const userData = await sessionData.account.get();
        sessionData.user = userData;
        
        res.json({
            success: true,
            user: userData
        });
    } catch (error) {
        console.error('Get user error:', error);
        res.status(401).json({
            success: false,
            error: 'Session expired or invalid'
        });
    }
});

// Generic Appwrite proxy endpoint
app.all('/aw/*', async (req, res) => {
    try {
        const tabToken = getTabToken(req);
        
        if (!tabToken || !sessionClients.has(tabToken)) {
            return res.status(401).json({
                success: false,
                error: 'No active session'
            });
        }
        
        const sessionData = sessionClients.get(tabToken);
        
        // Forward the request to Appwrite
        // This is a simplified proxy - you'd want to implement proper forwarding
        // based on your specific needs
        
        res.status(501).json({
            success: false,
            error: 'Generic proxy not implemented yet'
        });
    } catch (error) {
        console.error('Proxy error:', error);
        res.status(500).json({
            success: false,
            error: error.message
        });
    }
});

// Health check
app.get('/health', (req, res) => {
    res.json({
        status: 'healthy',
        activeSessions: sessionClients.size,
        timestamp: new Date().toISOString()
    });
});

app.listen(port, () => {
    console.log(`Auth proxy server running on http://localhost:${port}`);
    console.log(`Active sessions will be tracked per tab token`);
});
