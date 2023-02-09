.PHONY: install
install:
	rustup default nightly
	rustup target add wasm32-unknown-unknown
	parachain-launch generate paraspell-network-config.yml
	cd ./output && docker-compose up -d --build

.PHONY: initialize
initialize:
	cd .. && chmod 777 ./ui-v2
	apt-get update && apt-get upgrade
	apt install curl npm
	npm install -g n
	n stable
	npm install -g @open-web3/parachain-launch
	corepack enable
	curl -fsSL "https://github.com/pnpm/pnpm/releases/latest/download/pnpm-linuxstatic-x64" -o /bin/pnpm; chmod +x /bin/pnpm;
	apt-get install -y git clang libssl-dev llvm libudev-dev cmake
	
.PHONY: installDockerEngine
installDockerEngine:
	 sudo apt-get update
	 sudo apt-get install docker-ce docker-ce-cli containerd.io docker-compose-plugin

.PHONY: initializemac
initializemac:
	cd .. && chmod 777 ./ui-v2
	brew install curl node@16 npm pnpm docker git openssl make llvm protobuf python@3.9 
	npm install -g @open-web3/parachain-launch

.PHONY: rustup
rustup:
	curl --proto '=https' --tlsv1.2 -sSf https://sh.rustup.rs | sh

.PHONY: launch
launch:
	cd ./output && docker-compose down -v && docker-compose up -d --build

.Phone: dockerLaunch
dockerLaunch:
	docker build -t paraspell . && docker run -it -p 3000:3000 --rm --name paraspell1 paraspell
