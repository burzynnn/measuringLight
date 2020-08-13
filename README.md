# measuringLight

### Jak to działa?

Mikrokontroler w równych odstępach czasu dokonuje pomiaru oświetlenia, po czym korzystając z sieci WiFi i protokołu MQTT publikuje wiadomości w danym temacie, które trafiają do MQTT Brokera. Serwer oparty o Node.js subskrybuje ten sam temat, w którym mikrokontroler publikuje wiadomości, dzięki czemu wszystkie dane trafiają do aplikacji. Odebrane informacje przechodzą proces parsowania, ustawiania odpowiedniego formatu oraz zapisu w bazie danych. W wyniku poprawnego zapisu dane przesyłane są w czasie rzeczywistym do wszystkich klientów w przeglądarkach z pomocą Socket.IO, a także przedstawiane za pomocą wykresów. Dodatkowo, odwiedzając panel, serwer załaduje 5 ostatnich, zapisanych pomiarów z każdego czujnika. Strona klienta pozwala również na zlecenie serwerowi na generację arkusza kalkulacyjnego z ostatnimi pomiarami, a także w przypadku dostępu do Internetu wysłanie go na ustalony adres email.

Mikrokontroler --> MQTT Broker (Mosquitto) --> Node.js \<--> MongoDB \<--> Socket.IO \<--> Strona klienta

### Uruchomienie

#### Serwer

Do uruchomienia serwera wymagane jest oprogramowanie:

*   Docker v.19.03.12
*   Docker-compose v1.26.2

Podane powyżej wersje oprogramowania są używane przez nas podczas tworzenia aplikacji, więc jesteśmy pewni sprawności systemu. Nie wykluczamy poprawnego działania aplikacji wraz z innymi wersjami oprogramowania.

Będąc w głównym folderze repozytorium (/measuringLight) należy:

*   wejść do folderu /server - `cd /server`
*   skopiować plik odpowiadający za przechowywanie zmiennych środowiskowych - `cp .env.example .env`
*   uzupełnić plik odpowiadający za przechowywanie zmiennych środowiskowych - `sudo nano .env`

> Poprawne uzupełnienie pliku .env
> 
> SRV\_PORT=(dowolny port, który nie jest obecnie używany przez inną aplikację, np. '3000')  
> BROKER\_ADDR=(adres połączenia z MQTT Broker, w obecnym ustawieniu aplikacji zalecamy 'mqtt://broker:1883')  
> NODEMAILER\_ACC=(adres email konta Gmail, które będzie użyte do wysyłania wiadomości email)  
> NODEMAILER\_PWD=(hasło konta Gmail. w przypadku aktywowanej dwuetapowej weryfikacji wymagane jest wygenerowanie hasła z zgodnie z tym [poradnikiem](https://support.google.com/accounts/answer/185833?hl=pl))  
> NODEMAILER\_REC=(adres email, do którego będą kierowane wiadomości z raportami)  
> MONGO\_INITDB\_ROOT\_USERNAME=(nazwa użytkownika głównego konta dla MongoDB)  
> MONGO\_INITDB\_ROOT\_PASSWORD=(hasło głównego konta dla MongoDB)  
> MONGO\_USER=(nazwa użytkownika konta używanego w aplikacji dla MongoDB)  
> MONGO\_PWD=(hasło konta użytkownika używanego w aplikacji dla MongoDB)  
> MONGO\_DB=(nazwa bazy danych MongoDB używanej w aplikacji)

*   chcąc uruchomić tryb developmentu - `sudo docker-compose -f docker-compose.dev.yml up`
*   **NIE DZIAŁA W OBECNEJ WERSJI!** chcąc uruchomić tryb produkcyjny - `sudo docker-compose -f docker-compose.prod.yml up`

#### Mikrokontroler

### Uwagi

*   Dostęp do Internetu w sieci pozwala na wysyłanie wiadomości E-mail za pomocą [Nodemailer](https://github.com/nodemailer/nodemailer)
*   Serwer był tworzony oraz działał tylko na systemie Linux (Ubuntu/Manjaro), więc cała dokumentacja została stworzona w oparciu o ten system
