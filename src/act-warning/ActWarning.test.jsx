import { waitFor } from '@testing-library/react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { ActWarning } from './ActWarning';

const clipboardWriteMock = vi
	.fn()
	.mockImplementation((v) => Promise.resolve(v));

describe('act warning tests', () => {
	beforeAll(() => {
		Object.defineProperty(window.navigator, 'clipboard', {
			value: { writeText: clipboardWriteMock },
			configurable: true,
		});
	});

	beforeEach(() => {
		render(<ActWarning />);
	});

	it('throws an act warning', async () => {
		const button = screen.getByRole('button', {
			name: 'Copy',
		});

		await userEvent.type(
			screen.getByLabelText('Type and copy text'),
			'foo bar'
		);
		await userEvent.click(button);

		// Should wrap the assertion in waitFor
		expect(clipboardWriteMock).toHaveBeenCalledWith('foo bar');
	});

	it('does not throw an act warning', async () => {
		const button = screen.getByRole('button', {
			name: 'Copy',
		});

		await userEvent.type(
			screen.getByLabelText('Type and copy text'),
			'foo bar'
		);
		await userEvent.click(button);

		await waitFor(() => {
			expect(clipboardWriteMock).toHaveBeenCalledWith('foo bar');
		});
	});
});
