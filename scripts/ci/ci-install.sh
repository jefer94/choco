#!/usr/bin/env sh

# if lock file not exist
if ! test -f ~/fish.lock; then
  # add fish
  sudo apt-get update
  sudo apt-get -y install fish

  # generate lock file
  touch ~/fish.lock
fi

# if lock file not exist
if ! test -f ~/ufw.lock; then
  sudo ufw default deny incoming
  sudo ufw default allow outgoing
  sudo ufw allow 22
  sudo ufw allow 80
  sudo ufw allow 443
  echo y | sudo ufw enable

  # generate lock file
  touch ~/ufw.lock
fi

# if lock file not exist
if ! test -f ~/docker.lock; then
  # add docker
  sudo apt-get install -y \
    apt-transport-https \
    ca-certificates \
    curl \
    gnupg-agent \
    software-properties-common

  curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo apt-key add -
  sudo apt-key fingerprint 0EBFCD88

  sudo add-apt-repository \
    "deb [arch=amd64] https://download.docker.com/linux/ubuntu \
    $(lsb_release -cs) \
    stable"

  sudo apt-get update
  sudo apt-get install -y docker-ce docker-ce-cli containerd.io

  # setup docker
  sudo groupadd docker
  sudo usermod -aG docker $USER
  newgrp docker 
  sudo chown "$USER":"$USER" /home/"$USER"/.docker -R
  sudo chmod g+rwx "$HOME/.docker" -R

  # start docker
  sudo systemctl enable docker
  sudo systemctl start docker

  # generate lock file
  touch ~/docker.lock
fi

# if lock file not exist
if ! test -f ~/docker-login.lock; then
  sudo apt-get install gnupg2 pass
  touch ~/docker-login.lock
fi

# if lock file not exist
if ! test -f ~/docker-compose.lock; then
  # add docker-compose
  sudo apt-get update
  sudo apt-get install -y docker-compose

  # generate lock file
  touch ~/docker-compose.lock
fi
# 


# # if lock file not exist
# if ! test -f ~/root.lock; then
#   # add docker-compose
#   sudo apt-get update
#   sudo apt-get install -y docker-compose

#   # generate lock file
#   touch ~/root.lock
# fi
# 

# sudo usermod -a -G docker ubuntu

# sudo snap install kubeadm kubeadm kubelet --classic
# sudo snap install microk8s --classic --channel=1.18/stable
# sudo usermod -a -G microk8s $USER
# sudo chown -f -R $USER ~/.kube


# sudo kubeadm init --pod-network-cidr=10.244.0.0/16 --ignore-preflight-errors=NumCPU
# sudo kubeadm init --ignore-preflight-errors=NumCPU --node-name=master --pod-network-cidr=10.244.0.0/16

# LATERS
# kubeadm join 172.30.0.16:6443 --token q7icxm.8pizn9gvls36rph5 \
#     --discovery-token-ca-cert-hash sha256:037bc97bdffeae4e5cf86b11d4c9366a95e8126c9d1debd8969c0af5071107cb

# kubeadm join 172.30.0.16:6443 --token da812t.vuk0zh9fx1vyj862 \
#     --discovery-token-ca-cert-hash sha256:a10bafd79955ebea98edd5fd6b3f82bb1034c16b1048e3f85e2dc96d5909aa43

# https://phoenixnap.com/kb/install-kubernetes-on-ubuntu

# sudo groupadd docker
# sudo usermod -aG docker $USER
# newgrp docker
# sudo chown "$USER":"$USER" /home/"$USER"/.docker -R

# sudo apt install yarn



# IF DOCKER HAS ISSUE
# cd ${HOME}
# wget https://github.com/docker/docker-credential-helpers/releases/download/v0.6.3/docker-credential-secretservice-v0.6.3-amd64.tar.gz
# tar -xf docker-credential-secretservice-v0.6.3-amd64.tar.gz
# chmod +x docker-credential-secretservice
# mv /usr/bin/docker-credential-secretservice /usr/bin/docker-credential-secretservice.bkp
# mv docker-credential-secretservice /usr/bin/

# docker not work
# sudo snap install docker

