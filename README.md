# **Ticket Booking - Highly Scalable Microservice App**

This Ticket Booking application is built using modern web technologies to deliver a robust and scalable solution for booking events. It leverages **Node.js**, **MongoDB**, **Express**, **Next.js** (for the frontend), **Redis**, and **NATS Streaming** for seamless event-driven communication. The app follows both **Event-Driven Architecture (EDA)** and **Test-Driven Development (TDD)**, ensuring reliability and maintainability. Payment processing is integrated using **Stripe**. All services are containerized and managed with **Kubernetes**, with persistent storage using **volumes**.

In the payment service, there is an **expiration period** to ensure timely transactions. For example, once a ticket is reserved, it will remain reserved for **15 minutes**. If the payment is not completed within this timeframe, the order will **expire** and the ticket will be released.

---

## **Local Setup**

1. **Clone the repository.**  
`git clone https://github.com/vickykumar123/Ticket-Master---Microservice-app.git`


2. **Ensure Docker Desktop is installed and running with Kubernetes enabled.**

3. **Install Nginx Ingress.**  
Run the following command to install the Nginx ingress controller:
`kubectl apply -f https://raw.githubusercontent.com/kubernetes/ingress-nginx/controller-v1.12.0-beta.0/deploy/static/provider/cloud/deploy.yaml`


4. **Create necessary secrets (environment variables):**  
- Create the **JWT secret**:
  ```
  kubectl create secret generic jwt-secret --from-literal=JWT_KEY=topSecretJWTKey
  ```
- Create any additional secrets as defined in the `.yml` files.

5. **Run the app:**
- If **Skaffold** is installed:
  ```
  skaffold dev
  ```
- If Skaffold is not installed:
  ```
  cd infra/k8
  kubectl apply -f .
  ```

6. **Set up local DNS for `ticketing.dev`:**  
Modify the `/etc/hosts` file by adding the following entry:
`127.0.0.1 ticketing.dev`


7. **Set up a Stripe account** for payment processing and configure your Stripe keys.

8. **Access the app:**  
Once everything is up and running, visit:
`http://ticketing.dev`



Enjoy using the Ticket Booking app!

---

## **Tech Stack**

- **Backend:** Node.js, Express  
- **Frontend:** Next.js  
- **Database:** MongoDB  
- **Cache:** Redis  
- **Messaging:** NATS Streaming  
- **Containerization:** Docker  
- **Orchestration:** Kubernetes  
- **Payment:** Stripe  
- **Testing:** Jest  
- **Architecture:** Event-Driven & Test-Driven Development  

---

## **Core Features**

- **Microservice Architecture:** Each service is independently deployable and scalable.  
- **Event-Driven Communication:** Services communicate through NATS Streaming for real-time updates.  
- **Order Expiration Handling:** Orders expire if payment is not completed within 15 minutes.  
- **Containerized Services:** Managed using Docker and Kubernetes.  
- **Secure Payments:** Stripe integration for seamless transactions.  
- **TDD Workflow:** Comprehensive test coverage using Jest.

---

Happy coding! 🎉
