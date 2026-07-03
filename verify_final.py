from playwright.sync_api import sync_playwright, expect
import time

def verify_studio(page):
    page.goto("http://localhost:5173/studio")
    page.wait_for_selector("input[placeholder='Type your magic word...']", timeout=10000)

    # Just click generate with default '🔥'
    page.fill("input[placeholder='Type your magic word...']", "LOVE")
    page.click("button:has-text('Create Emoji Art')")

    time.sleep(5)

    expect(page.locator("#emoji-canvas")).to_be_visible()
    page.screenshot(path="studio_v3.png", full_page=True)
    print("Screenshot saved as studio_v3.png")

if __name__ == "__main__":
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        page = browser.new_page()
        try:
            verify_studio(page)
        except Exception as e:
            print(f"Error: {e}")
        finally:
            browser.close()
