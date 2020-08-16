# Set up the Docker daemon
cat > /etc/docker/daemon.json <<EOF
{
  "exec-opts": ["native.cgroupdriver=systemd"],
  "log-driver": "json-file",
  "log-opts": {
    "max-size": "100m"
  },
  "storage-driver": "overlay2"
}
EOF
mkdir -p /etc/systemd/system/docker.service.d
# Restart Docker
systemctl daemon-reload
systemctl restart docker
yay -S socat
sudo pacman -S haproxy
sudo pacman -S ethtool ebtables socat conntrack-tools
cp -i /etc/kubernetes/admin.conf $HOME/.kube/config
sudo chmod +r .kube/config
yay -S helm