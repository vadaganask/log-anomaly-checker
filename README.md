# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.

### Start dev server

To start the server in development mode use

```node
npm run dev
```

### Build the app

To build the app use

```node
npm run build
```

### Deploy the app

To deploy the app

```node
npm run build
```

use the `dist` folder created with above command and follow steps below:

Deploying a Vite React application to an AWS EC2 instance involves several key steps:

**1\. Prepare Your EC2 Instance:**

- **Launch an EC2 Instance:** Log into your AWS console, navigate to EC2, and launch a new instance. Choose an appropriate Amazon Machine Image (AMI) (e.g., Ubuntu, Amazon Linux 2\) and instance type.
- **Configure Security Group:** Create or configure a security group to allow inbound traffic on necessary ports, including SSH (port 22\) for connecting to the instance, and HTTP/HTTPS (ports 80/443) for serving your application.
- **Create/Utilize Key Pair:** Create a new SSH key pair or use an existing one to securely connect to your instance. Download the .pem file and store it securely.

**2\. Connect to Your EC2 Instance and Install Dependencies:**

- **SSH into EC2:** Use an SSH client and your key pair to connect to the EC2 instance. \[[1](https://medium.com/@abdul-hadi/how-to-deploy-nextjs-vite-react-react-application-on-aws-ec2-instances-in-2024-ed126473eafb)\]

| `ssh -i /path/to/your/key.pem ec2-user@your-ec2-public-ip` |
| :--------------------------------------------------------- |

(Replace ec2-user with the appropriate username for your AMI, e.g., ubuntu for Ubuntu AMIs.) Update Packages.

| `sudo apt update && sudo apt upgrade -y` |
| :--------------------------------------- |

Install Node.js and npm.

| `curl -fsSL https://deb.nodesource.com/setup_lts.x | sudo -E bash - sudo apt-get install -y nodejs` |
| :------------------------------------------------- | ---------------------------------------------- |

- **Install a Web Server (e.g., Nginx or Apache):**

For Nginx:

| `sudo apt install nginx -y` |
| :-------------------------- |

For Apache:

| `sudo apt install apache2 -y` |
| :---------------------------- |

**3\. Deploy Your Vite React Application:**

- **Transfer Your Application Code:**
  - **Git Clone:** If your code is in a Git repository:

| `git clone <your-repository-url>` |
| :-------------------------------- |

- **SCP:** Securely copy your project files from your local machine to the EC2 instance using scp.
- **Navigate to Project Directory:**

| `cd your-project-directory` |
| :-------------------------- |

Install Dependencies and Build.

| `npm install     npm run build` |
| :------------------------------ |

This will create a dist folder containing your production-ready static assets.

**4\. Configure the Web Server:**

- **Nginx Configuration:**
  - Create a new Nginx configuration file for your site (e.g., sudo nano /etc/nginx/sites-available/your-app.conf).
  - Configure a server block to serve your dist folder and potentially set up a reverse proxy if you have a backend.
  - Example for serving static files:

| `server {             listen 80;             server_name your-domain.com your-ec2-public-ip; # Replace with your domain or IP             root /path/to/your-project/dist;             index index.html;             try_files $uri $uri/ /index.html;         }` |
| :---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |

- Enable the site and test the configuration:

| `sudo ln -s /etc/nginx/sites-available/your-app.conf /etc/nginx/sites-enabled/         sudo nginx -t         sudo systemctl restart nginx` |
| :----------------------------------------------------------------------------------------------------------------------------------------- |

- **Apache Configuration:**
  - Copy the contents of your dist folder to the Apache web root (e.g., /var/www/html).
  - Ensure Apache is running: sudo systemctl start apache2.

**5\. Access Your Application:**

- Open your web browser and navigate to your EC2 instance's public IP address or the domain name if you have configured one. Your Vite React application should now be accessible.
