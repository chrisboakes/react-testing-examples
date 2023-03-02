import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default 
	defineConfig({
		plugins: [react()],
		test: {
			globals: true,
			environment: 'jsdom',
			testTimeout: 10000,
			setupFiles: './tests/setup.js'
		},
	});
