package pl.test.events.services;

import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.BeforeAll;
import org.junit.jupiter.api.Test;
import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.chrome.ChromeDriver;

class EventServiceTest {
    static WebDriver driver;
    @BeforeAll
    static void  setupChromeDriver() {
        System.setProperty("webdriver.chrome.driver", "src/test/resources/chromedriver.exe");
        driver = new ChromeDriver();
        options();
    }

    static void options() {
        driver.manage().window().maximize();
    }


    @Test
    public void login_check_if_redirects_to_login_page() {
        driver.get("http://localhost:3000/home");

        WebElement login = driver.findElement(By.cssSelector(".navbar .btn.btn-primary"));
        login.click();

        Assertions.assertEquals("http://localhost:3000/login", driver.getCurrentUrl());

        driver.quit();

    }



}