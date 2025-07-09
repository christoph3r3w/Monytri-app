export function observe(element, { onEnter, onExit, threshold = 0.5 }) {
	const observer = new IntersectionObserver(
		(entries) => {
			entries.forEach(entry => {
				if (entry.isIntersecting) {
					onEnter?.(entry);
				} else {
					onExit?.(entry);
				}
			});
		},
		{ threshold }
	);

	observer.observe(element);

	return {
		destroy() {
			observer.unobserve(element);
		}
	};
}