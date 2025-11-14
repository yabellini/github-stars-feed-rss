## GitHub Stars Contributions Export

> A simple tool to export all your contributions from your GitHub Stars profile to a CSV file.

This tool connects to the GitHub Stars API and retrieves all your saved contributions (blog posts, videos, etc.) and exports them to a CSV file for easy access and analysis.

## Usage

1. Set your GitHub Stars API token as an environment variable:
   ```bash
   export TOKEN=your_github_stars_api_token
   ```

2. Install dependencies:
   ```bash
   yarn install
   ```

3. Run the export:
   ```bash
   node index.js
   ```

4. Your contributions will be saved to `contributions.csv` in the current directory.

## CSV Output

The exported CSV file contains the following columns:
- **ID**: Unique identifier for the contribution
- **Type**: Type of contribution (e.g., BLOGPOST, VIDEO_PODCAST)
- **Date**: Publication date of the contribution
- **Title**: Title of the contribution
- **Description**: Description or content of the contribution
- **URL**: Link to the contribution

## Requirements

- Node.js 14.x or higher
- A valid GitHub Stars API token
