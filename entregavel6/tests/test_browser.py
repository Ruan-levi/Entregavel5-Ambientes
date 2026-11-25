"""Testes E2E: navegador real Chrome e Selenium (sem senhas ou dados privados)."""
import os
import pathlib
import unittest
from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.chrome.options import Options
from selenium.webdriver.support.ui import WebDriverWait

BASE = os.environ.get("CONQUEST_TEST_BASE", "http://127.0.0.1:5173").rstrip("/")
OUTPUT = pathlib.Path("entregavel6/evidencias")
OUTPUT.mkdir(parents=True, exist_ok=True)

class ConquestE6BrowserTests(unittest.TestCase):
    @classmethod
    def setUpClass(cls):
        options = Options()
        options.add_argument("--headless=new")
        options.add_argument("--no-sandbox")
        options.add_argument("--disable-dev-shm-usage")
        options.add_argument("--window-size=1440,900")
        options.add_argument("--use-gl=swiftshader")
        options.add_argument("--enable-unsafe-swiftshader")
        cls.driver = webdriver.Chrome(options=options)
        cls.driver.set_page_load_timeout(45)

    @classmethod
    def tearDownClass(cls):
        cls.driver.quit()

    def tearDown(self):
        name = self.id().split(".")[-1]
        self.driver.save_screenshot(str(OUTPUT / (name + ".png")))

    def test_01_seis_ambientes_e_links(self):
        self.driver.get(BASE + "/entregavel6/")
        wait = WebDriverWait(self.driver, 20)
        wait.until(lambda d: "Entregável 6" in d.title)
        self.assertEqual(len(self.driver.find_elements(By.CSS_SELECTOR, ".card")), 6)
        self.assertIn("Uma aventura.", self.driver.find_element(By.TAG_NAME, "h1").text)
        self.assertTrue(self.driver.find_element(By.ID, "play-conquest").get_attribute("href").endswith("/"))
        self.assertTrue(any("figma.com" in a.get_attribute("href") for a in self.driver.find_elements(By.CSS_SELECTOR, ".card a")))

    def test_02_pagina_serve_jogo_original_da_entrega(self):
        self.driver.get(BASE + "/")
        self.assertIn("Conquest", self.driver.title)
        self.assertTrue(self.driver.find_element(By.ID, "renderCanvas"))
        self.assertTrue(self.driver.find_element(By.ID, "portal-title"))
        self.assertTrue(self.driver.find_element(By.ID, "portal-duel-open"))

    def test_03_formulario_react_preserva_wasd_e_atalhos(self):
        self.driver.get(BASE + "/")
        wait = WebDriverWait(self.driver, 40)
        wait.until(lambda d: d.execute_script(
            "return document.documentElement.dataset.conquestReactReady === 'true'"
        ))
        wait.until(lambda d: d.find_element(By.ID, "e5-react-open").is_displayed())
        self.driver.find_element(By.ID, "e5-react-open").click()
        email = wait.until(lambda d: d.find_element(By.CSS_SELECTOR, "#entregavel5-react-root input[type=email]"))
        sample = "wasdERQ1234@example.com"
        email.send_keys(sample)
        self.assertEqual(email.get_attribute("value"), sample)
        self.assertTrue(self.driver.find_element(By.CSS_SELECTOR, "#entregavel5-react-root input[type=password]"))

    def test_04_ranking_rest_publico(self):
        self.driver.get(BASE + "/entregavel6/")
        self.driver.find_element(By.ID, "check-api").click()
        wait = WebDriverWait(self.driver, 30)
        result = wait.until(lambda d: d.find_element(By.ID, "api-result").text
                            if "API online" in d.find_element(By.ID, "api-result").text
                            or "Não foi possível" in d.find_element(By.ID, "api-result").text
                            else False)
        self.assertIn("API online", result, "A Function REST do Nhost não respondeu no navegador: " + result)
        self.assertNotEqual(self.driver.find_element(By.ID, "ranking-results").text.strip(), "")

if __name__ == "__main__":
    unittest.main(verbosity=2)
