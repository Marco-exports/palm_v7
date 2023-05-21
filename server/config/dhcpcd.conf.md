***  /etc/dhcpcd.conf  ***

### dhcpcd via the control socket.

### Inform the DHCP server of our hostname for DDNS.
hostname

### Use the hardware address of the interface for the Client ID.
clientid

### Persist interface configuration when dhcpcd exits.
persistent

### Rapid commit support...  Safe to enable by default because
### it requires the equivalent option set
### on the server to actually work.
option rapid_commit

### A list of options to request from the DHCP server:
option domain_name_servers, domain_name, domain_search, host_name
option classless_static_routes

### Respect the network MTU. This is applied to DHCP routes.
option interface_mtu

### A ServerID is required by RFC2131.
require dhcp_server_identifier

### OR generate Stable Private IPv6 Addresses based from the DUID
slaac private

### Example static IP configuration:
### static ip6_address=fd51:42f8:caae:d92e::ff/64

### It is possible to fall back to a static IP if DHCP fails:
### define static profile

interface wlan
static ip_address=198.168.1.22/24
static routers=10.0.0.1
static domain_name_servers=10.0.0.1

### fallback to static profile on eth0
### interface eth0
### fallback static_eth0
