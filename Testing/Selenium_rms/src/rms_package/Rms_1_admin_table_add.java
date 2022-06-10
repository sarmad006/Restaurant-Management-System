package rms_package;

import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.chrome.ChromeDriver;

public class Rms_1_admin_table_add {

	public static void main(String[] args) throws InterruptedException {
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
		driver.findElement(By.xpath("//*[@id='root']/div/div/button[1]")).click();
		
		// Finding TextBar and giving required input
		driver.findElement(By.xpath("//*[@id='root']/div/div/div/form/div[1]/div/input")).sendKeys("admin");
		driver.findElement(By.xpath("//*[@id=\'root\']/div/div/div/form/div[2]/div/input")).sendKeys("fast123");
		driver.findElement(By.xpath("//*[@id=\'root\']/div/div/div/form/button")).submit();
		
		// Allocation of table
		driver.findElement(By.xpath("//*[@id='root']/div/div[1]/div/div/ul/div[3]/div[2]/span")).click();
		Thread.sleep(500);
		driver.findElement(By.xpath("//*[@id=\'root\']/div/div[2]/div/div/div/span/button")).click();
		Thread.sleep(500);
		driver.findElement(By.xpath("//*[@id=\'root\']/div/div[2]/div/div/div/div/div/div/input")).sendKeys("5");
		Thread.sleep(500);
		driver.findElement(By.xpath("//*[@id='root']/div/div[2]/div/div/div/div/button")).click();
		Thread.sleep(500);
		System.out.println("Test Succesful");
	}

}
