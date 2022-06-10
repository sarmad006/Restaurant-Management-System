package rms_package;

import java.awt.AWTException;
import java.awt.Robot;

import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.chrome.ChromeDriver;
import org.openqa.selenium.interactions.Actions;

public class Rms_12_Customer_Profile_Settings_3 {

	public static void main(String[] args) throws AWTException, InterruptedException {
		// TODO Auto-generated method stub
		// TODO Auto-generated method stub
		System.setProperty("webdriver.chrome.driver","D:\\SQE\\r\\chromedriver_win32\\chromedriver.exe");
		
		//Creating reference variable to open Chrome
		WebDriver driver = new ChromeDriver();
		
		//Maximizing the Browser
		driver.manage().window().maximize();
		
		//Providing Web Address 
		driver.get("http://localhost:3000/");
		
		//Finding login button by xpath
		driver.findElement(By.xpath("//*[@id=\'root\']/div/div/button[2]")).click();
		driver.findElement(By.xpath("//*[@id='root']/div/div/div/button")).click();
		Thread.sleep(500);
		
		// Finding TextBar and giving required input
		driver.findElement(By.xpath("//*[@id=\'root\']/div/div/div/form/div[1]/div/input")).sendKeys("khizer406");
		driver.findElement(By.xpath("//*[@id=\'root\']/div/div/div/form/div[2]/div/input")).sendKeys("abc123");
		driver.findElement(By.xpath("//*[@id=\'root\']/div/div/div/form/button")).submit();
		Thread.sleep(500);
		
		driver.get("http://localhost:3000/customer/home/1");
		driver.findElement(By.xpath("//*[@id=\'root\']/div/div[1]/div/div/ul/div[5]/div[2]/span")).click();
		Thread.sleep(500);
		driver.findElement(By.xpath("//*[@id=\'root\']/div/div[2]/div/div/div/div[4]/button")).click();
		driver.findElement(By.xpath("/html/body/div[2]/div[3]/div/div/input")).sendKeys("03343390988");
		Thread.sleep(500);
		
		Actions actions = new Actions(driver);
		Robot robot = new Robot();
		robot.mouseMove(50,50);
		actions.click().build().perform();
		System.out.println("Test Succesful");
	}
	
}
