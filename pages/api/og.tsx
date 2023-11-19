import { ImageResponse } from "@vercel/og";
import { NextRequest } from "next/server";
import cheerio from "cheerio";

export const config = {
  runtime: "edge",
};

export default async function handler(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const url = searchParams.get("url");

  console.log(url);

  function processImageURL(urlimg: any) {
    // Check if the URL starts with '/'
    if (urlimg.startsWith("/")) {
      return url + urlimg;
    } else {
      return urlimg;
    }
  }

  try {
    // Fetch HTML content from the provided URL
    const response = await fetch(url);
    const html = await response.text();

    // Load HTML content into Cheerio
    const $ = cheerio.load(html);

    // Extract information from meta tags
    const metaTags = $("meta");
    const extractedInfo: any = {};

    metaTags.each((_, tag) => {
      const tagName = $(tag).attr("name");
      const tagProperty = $(tag).attr("property");
      const tagContent = $(tag).attr("content");

      if (tagName) {
        extractedInfo[tagName] = tagContent;
      } else if (tagProperty) {
        // If the name attribute is not present, use the property attribute
        extractedInfo[tagProperty] = tagContent;
      }
    });

    console.log(extractedInfo);

    // Create a new object with fallbacks for title, description, and image
    const result = {
      title:
        extractedInfo.title ||
        extractedInfo["twitter:title"] ||
        extractedInfo["og:title"],
      description:
        extractedInfo.description ||
        extractedInfo["twitter:description"] ||
        extractedInfo["og:description"],
      image:
        extractedInfo.image ||
        extractedInfo["twitter:image"] ||
        extractedInfo["og:image"],
    };

    // console.log(result);
    processImageURL(result.image);

    return new ImageResponse(
      (
        <div
          style={{
            border: "1px solid #fff",
            overflow: "hidden",
            maxWidth: 1200,
            height: 700,
            margin: "auto",
            display: "flex",
            flexDirection: "column",
            background: "#fff",
          }}
        >
          <img
            style={{ backgroundSize: "cover", borderBottom: "1px solid #ccc" }}
            src={
              processImageURL(result.image) ??
              "https://placehold.co/1200x700.png"
            }
            alt="Twitter Card Image"
            width={1200}
            height={550}
          />
          <div
            style={{ padding: 15, display: "flex", flexDirection: "column" }}
          >
            <div
              style={{
                fontSize: 30,
                fontWeight: "bold",
                marginBottom: 10,
              }}
            >
              {result.title ?? "Website Title"}
            </div>
            <div
              style={{
                marginBottom: 20,
                color: "gray",
              }}
            >
              {String(result.description).substring(0, 40) ??
                "Create a Twitter Webiste Card with this simple API"}
            </div>
            <div
              style={{
                marginBottom: 15,
                color: "gray",
              }}
            >
              {url}
            </div>
          </div>
        </div>
      ),
      {
        width: 1200,
        height: 700,
      }
    );
  } catch (error) {
    console.log(error);
  }
}
