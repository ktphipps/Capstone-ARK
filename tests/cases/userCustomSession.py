import pyautogui;
import time;
import unittest 
from selenium import webdriver 
from selenium.webdriver.common.keys import Keys 

# inherit TestCase Class and create a new test class 
class userCustomSession(unittest.TestCase): 

	# initialization of webdriver 
	def setUp(self): 
		self.driver = webdriver.Firefox()
		self.driver.implicitly_wait(30)

	# Test case method.
	def test_custom_session_play(self): 
		
		# get driver 
		driver = self.driver 
		# get ractrainer web app using selenium 
		driver.get("http://localhost:5000/") 

		# locate element using name 
		elem = driver.find_element_by_xpath("//a[contains(.,'Login')]") 
		# send data 
		elem.click() 

		# locate element using id
		elem = driver.find_element_by_id("Uname")
		# send data 
		elem.send_keys('011@test.com')
		# locate element using id
		elem = driver.find_element_by_id("password")
		# send data 
		elem.send_keys('MEGAFISH')
		# locate element using name 
		elem = driver.find_element_by_xpath("//button[contains(.,'Log in')]") 
		# send data 
		elem.click() 

		time.sleep(1)
		# locate element using name 
		elem = driver.find_element_by_xpath("//button[contains(.,'Start Game')]") 
		# send data 
		elem.click() 

		time.sleep(1)
		# locate element using name 
		elem = driver.find_element_by_xpath("//button[contains(.,'START')]") 
		# send data 
		elem.click() 

		time.sleep(0.38)

		# simulate playing the game
		timeLimit = time.time() + 30
		while time.time() < timeLimit:
			pyautogui.keyDown('space')
			time.sleep(0.1)
			pyautogui.keyUp('space')
			time.sleep(0.3)

		# check to make sure we are on the results screen
		elem = driver.find_element_by_id("score").text
		assert "Score:" in elem 

		time.sleep(1)

	# cleanup method called after every test performed 
	def tearDown(self): 
		self.driver.close() 

# execute the script 
if __name__ == "__main__": 
	unittest.main() 
