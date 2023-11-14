import { JSDOM } from 'jsdom';
import {
  PlaywrightWebBaseLoader,
  Page,
  Browser
} from "langchain/document_loaders/web/playwright";

export default class WebScrapper {

  /**
   * Helper to remove unwanted HTML elements from the documents
   */
  
  removeElements(document: Document, selector: string) {
    const elements = document.querySelectorAll(selector);
    elements.forEach(ele => {
      ele.remove();
    });
  } 

  /**
   * Scrape a webpage
   */
  
  public async scrape(url: string, contentQuerySelector: string = "body", elementsToRemove: string[])  {
    const loader = new PlaywrightWebBaseLoader(url, {
      gotoOptions: {
        waitUntil: "domcontentloaded",
      }
    });

    const docs = await loader.load();
    const dom = new JSDOM(docs[0].pageContent);
    const document = dom.window.document;
    let contentText: string | null = '';
    let titleText: string | null = '';
    let cleanContentText: string | null = '';

    if (document) {
      // Get story body text
      const contentElement = document.querySelector(contentQuerySelector);

      // Remove unwanted elements
      elementsToRemove.forEach(elementSelector => {
        this.removeElements(document, elementSelector);
      });

      if (contentElement && contentElement.textContent) {
        let rawText = contentElement.textContent.replace(/(\r\n\n\n|\n\n\n\n)/gm, '\n')
                                                .replace(/(\r\n\n|\n\n\n)/gm, '\n')
                                                .replace(/(\r\n|\n\n)/gm, '\n');
        contentText = rawText;
      }

      const titleElement = document.querySelector('.article__headline-section');
      if (titleElement && titleElement.textContent) {
        titleText = titleElement.textContent;
      }

      cleanContentText = contentText;
    }

    return cleanContentText;
  }
}
