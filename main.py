import webview
import os

#####################################
# Painting the main window

class Api:
    def functionWin(self):
        window2 = webview.create_window('Python Calculator', 'html/functions.html', width=600, height=463, fullscreen=False, js_api=api)
        webview.start()
    def convButton(self):
        # Eh bim la fôte dans le nom du fichier :)
        window2 = webview.create_window('Python Calculator', 'html/convertion.html', width=600, height=463, fullscreen=False, js_api=api)
        webview.start()
    def statBtn(self):
        window2 = webview.create_window('Python Calculator', 'html/statistics.html', width=600, height=463, fullscreen=False, js_api=api)
        webview.start()
    def probaBtn(self):
        window2 = webview.create_window('Python Calculator', 'html/proba.html', width=600, height=463, fullscreen=False, js_api=api)
        webview.start()
    def moreOptions(self):
        global window
        window.resize(1000, 600)
    def getConvertion(self):
        x = 0

api=Api()
window = webview.create_window('Python Calculator', 'html/index.html', width=600, height=463, fullscreen=False, js_api=api)
webview.start(debug=True)
