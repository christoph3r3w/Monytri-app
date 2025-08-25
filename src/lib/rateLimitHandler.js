/**
 * Utility function to handle Appwrite rate limits with exponential backoff
 */
export class RateLimitHandler {
    static async withRetry(apiCall, maxRetries = 3, baseDelay = 1000) {
        for (let attempt = 0; attempt < maxRetries; attempt++) {
            try {
                return await apiCall();
            } catch (error) {
                // Check if it's a rate limit error
                if ((error.code === 429 || error.message?.includes('Rate limit')) && attempt < maxRetries - 1) {
                      const delay = baseDelay * Math.pow(2, attempt);
                      console.log(`Rate limit hit, retrying in ${delay}ms (attempt ${attempt + 1}/${maxRetries})`);
                      await this.sleep(delay);
                      continue;
                }

                throw error;
            }
        }
    }

    static sleep(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    /**
     * Debounce function to prevent rapid successive calls
     */
    static debounce(func, wait) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    }

    /**
     * Throttle function to limit call frequency
     */
    static throttle(func, limit) {
        let inThrottle;
        return function() {
            const args = arguments;
            const context = this;
            if (!inThrottle) {
                func.apply(context, args);
                inThrottle = true;
                setTimeout(() => inThrottle = false, limit);
            }
        }
    }
}
