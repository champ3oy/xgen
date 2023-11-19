# xgen

## Overview

xgen is a simple API designed to dynamically generate Open Graph (OG) images for websites, enhancing their visual representation when shared on social media platforms. This README provides essential information on how to integrate and use xgen to create personalized OG images for your website.

## Getting Started

### Installation

No installation is required for xgen. Simply make HTTP requests to the provided endpoint with the target URL.

### API Endpoint

```
GET /api/og?url=<website-url>
```

Replace `<website-url>` with the URL of the webpage you want to generate an OG image for.

### Example

```bash
curl http://localhost:3000/api/og?url=https://your-website.com
```

This will return a dynamically generated OG image for the specified website.

## Features

1. **Dynamic Image Generation:** On-demand creation of OG images based on provided website URLs.

2. **Metadata Integration:** Utilizes website metadata (title, description, keywords) for personalized and relevant OG images.

3. **Easy Integration:** Simple HTTP GET requests to the API endpoint without the need for complex setup.

4. **Responsive Design:** Ensures visually stunning OG images that adapt to various screen sizes and resolutions.

5. **Real-time Updates:** Automatically updates OG images based on the latest metadata, keeping shared links fresh.

## Use Cases

- **Enhance Social Media Shares:** Make your shared links stand out with visually appealing OG images.

- **Personalized Previews:** Dynamically generate OG images tailored to the content of each webpage.

- **Effortless Integration:** Seamlessly incorporate OG image generation into your website or application.

## Contributing

Feel free to contribute to the development of xgen. Check out the [CONTRIBUTING.md](CONTRIBUTING.md) file for details on our code of conduct and the process for submitting pull requests.

## License

This project is licensed under the [MIT License](LICENSE) - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- @cirlormx
