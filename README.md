# calculatrice
Calculatrice faite pour le projet de NSI en classe de 1ere.
Elle est écrite en Python avec une interface graphique faite en HTML.

## Installation
Pour installer ce logiciel, il faut python dans sa version 3
### Windows

Les versions trop récentes de python ne fonctionnent pas car elles ne sont pas prises en charge par pythonnet.
La dernière fonctionnelle est python 3.9, elle peut être installée ici pour windows :
https://www.python.org/ftp/python/3.9.7/python-3.9.7-amd64.exe

Il faudra ensuite installer les dépendances du programme :
    
    py -m pip install -r requirements.txt
    
Pour lancer le programme, il ne suffira que de taper :

    py main.my
    
Si une erreur liée à pythonnet apparaît, ou que le programme affiche une RuntimeError, tapez :
  
    py -m pip uninstall pythonnet
    py -m pip install pythonnet==3.0.0a1
    py -m pip install -r requirements.txt

Si le programme affiche une page requierant des permissions administrateurs pour l'inspecteur de pages web, acceptez.
<br>Fermez ensuite le programme et relancez le depuis la ligne de commande.

### Linux
Pour Installer Python3 sur Linux, il vous faudra ces commandes en fonction des versions :

  - Debian :
    <br><code># apt install python3</code>

  - Arch :
    <br><code># pacman -S python</code>

Il suffira ensuite d'installer les dépendances liées au programme avec pip :  

    $ pip3 install -r requirements.txt

Pour lancer le logiciel il n'y aura plus qu'à exécuter le fichier main.py ou à taper :

    $ python3 main.py
    
### MacOS
On a pas de Mac, donc impossible de vous aider ¯\\_(ツ)_/¯
