package rms_package;

import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.chrome.ChromeDriver;

public class Rms_17_admin_customer_order_payment_insufficient {

	public static void main(String[] args) throws InterruptedException {
		// TODO Auto-generated method stub
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
		
		// Finding TextBar and giving required input
		driver.findElement(By.xpath("//*[@id=\'root\']/div/div/div/form/div[1]/div/input")).sendKeys("khizer406");
		driver.findElement(By.xpath("//*[@id=\'root\']/div/div/div/form/div[2]/div/input")).sendKeys("abc123");
		driver.findElement(By.xpath("//*[@id=\'root\']/div/div/div/form/button")).submit();
		Thread.sleep(500);
		
		driver.get("http://localhost:3000/customer/home/1");
		
		driver.findElement(By.xpath("//*[@id=\'root\']/div/div[1]/div/div/ul/div[1]/div[2]/span")).click();
		Thread.sleep(500);
		driver.findElement(By.xpath("//*[@id=\'root\']/div/div[2]/div/div/div[2]/div[2]/div/div/div[3]/button")).click();
		Thread.sleep(500);
		driver.findElement(By.xpath("//*[@id=\'root\']/div/div[2]/div/div/button")).click();
		Thread.sleep(500);
		driver.findElement(By.xpath("//*[@id=\'root\']/div/div[2]/div/div/div[2]/button[2]")).click();
		Thread.sleep(500);
		driver.findElement(By.xpath("//*[@id=\'root\']/div/div[2]/div/div/button[2]")).click();
		Thread.sleep(500);
		driver.findElement(By.xpath("//*[@id=\'root\']/div/div[2]/div/div/div[2]/div/div/input")).sendKeys("10");
		Thread.sleep(500);
		driver.findElement(By.xpath("//*[@id=\'root\']/div/div[2]/div/div/div[2]/button")).click();
		System.out.println("Test Succesful");
	}

}
