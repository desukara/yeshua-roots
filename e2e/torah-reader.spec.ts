// @ts-nocheck
import {test,expect} from "@playwright/test";
test("deep link, bookmarks, resume, and chapter navigation",async({page})=>{
 await page.goto("/torah?book=Genesis&chapter=1&verse=5#interlinear-reader");
 const reader=page.locator("#interlinear-reader");
 await expect(reader).toBeVisible();
 await expect(reader.locator(".torah-reader-pagination strong")).toContainText("Genesis 1:5");
 await reader.getByRole("button",{name:/Bookmark verse/}).click();
 await expect(reader.getByRole("button",{name:/Bookmarked/})).toBeVisible();
 await reader.getByRole("button",{name:"Next verse"}).click();
 await expect(reader.locator(".torah-reader-pagination strong")).toContainText("Genesis 1:6");
 await reader.getByLabel("Jump to saved verse").selectOption("Genesis 1:5");
 await expect(reader.locator(".torah-reader-pagination strong")).toContainText("Genesis 1:5");
 await page.reload();
 await expect(reader.locator(".torah-reader-pagination strong")).toContainText("Genesis 1:5");
});
test("invalid verse link is clamped to the chapter",async({page})=>{
 await page.goto("/torah?book=Genesis&chapter=1&verse=176#interlinear-reader");
 const reader=page.locator("#interlinear-reader");
 await expect(reader.locator(".torah-reader-pagination strong")).toContainText("Genesis 1:31");
});
test("last verse advances to next chapter",async({page})=>{
 await page.goto("/torah?book=Genesis&chapter=1&verse=31#interlinear-reader");
 const reader=page.locator("#interlinear-reader");
 await expect(reader.locator(".torah-reader-pagination strong")).toContainText("Genesis 1:31");
 await reader.getByRole("button",{name:"Next verse"}).click();
 await expect(reader.locator(".torah-reader-pagination strong")).toContainText("Genesis 2:1");
});
