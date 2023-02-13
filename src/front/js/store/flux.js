import axios from "axios";
import swal from "sweetalert";
import Swal from "sweetalert2";

const getState = ({ getStore, getActions, setStore }) => {
	return {
		store: {


			// message: null,
			// demo: [
			// 	{
			// 		title: "FIRST",
			// 		background: "white",
			// 		initial: "white"
			// 	},
			// 	{
			// 		title: "SECOND",
			// 		background: "white",
			// 		initial: "white"
			// 	}
			// ]

			service: [],
			serviceDetail: {},
			serviceId: null,
			servicesIds: [],
			services: [],
			user: [],
			userDetail: {},
			userId: null,
			admin: false,
			premium: false,
			auth: false,
			registered: false,
			profile: {},
			
		},
		actions: {


			// Use getActions to call a function within a fuction
			// exampleFunction: () => {
			// 	getActions().changeColor(0, "green");
			// },

			// getMessage: async () => {
			// 	try{
			// 		// fetching data from the backend
			// 		const resp = await fetch(process.env.BACKEND_URL + "/api/hello")
			// 		const data = await resp.json()
			// 		setStore({ message: data.message })
			// 		// don't forget to return something, that is how the async resolves
			// 		return data;
			// 	}catch(error){
			// 		console.log("Error loading message from backend", error)
			// 	}
			// },
			// changeColor: (index, color) => {
			// 	//get the store
			// 	const store = getStore();

			// 	//we have to loop the entire demo array to look for the respective index
			// 	//and change its color
			// 	const demo = store.demo.map((elm, i) => {
			// 		if (i === index) elm.background = color;
			// 		return elm;
			// 	});

			// 	//reset the global store
			// 	setStore({ demo: demo });
			// }

			//-----------------------------------------------------------------------------------------------------------------------------
      //											 GET PROFILE
      //-----------------------------------------------------------------------------------------------------------------------------

      userProfile: async () => {
        // looks for a token
        const userToken = localStorage.getItem("token");
        try {
          const response = await axios.get(
            process.env.BACKEND_URL + "/api/profile",
            {
              headers: {
                Authorization: "Bearer " + userToken,
              },
            }
          );
          // console.log(data)
          setStore({
            profile: response.data.user,
          });
          // console.log(response.data);
          return true;
        } catch (error) {
          // console.log(error);
          if (error.code === "ERR_BAD_REQUEST") {
            // console.log(error.response.data.msg);
            return;
          }
        }
      },

      //-----------------------------------------------------------------------------------------------------------------------------
      //											PUT UPDATE USERS
      //-----------------------------------------------------------------------------------------------------------------------------

      updateUser: async (name, lastname, country, password, user_url) => {
        // bring user data by id
        let store = getStore();
        let user_id = store.userId;
        try {
          const response = await axios.put(
            process.env.BACKEND_URL + "/api/user/" + user_id,
            {
              //   email: email,
              //   username: username,

              name: name,
              lastname: lastname,
              country: country,
              password: password,
              user_url: user_url,
            }
          );
          // Sweet alert
          Swal.fire({
            position: "top",
            icon: "success",
            title: "Your profile has been updated",
            showConfirmButton: false,
            timer: 1500,
          });
          console.log(response);
        } catch (error) {
          // Error codes
          // console.log(error);
          if (error.response.status === 401) {
            Swal.fire({
              icon: "error",
              title: "Oops...",
              text: error.response.data.msg,
            });
            return error.response.data.msg;
          }
          if (error.response.status === 409) {
            Swal.fire({
              icon: "error",
              title: "Oops...",
              text: error.response.data.msg,
            });
            return error.response.data.msg;
          }
          if (error.response.status === 404) {
            Swal.fire({
              icon: "error",
              title: "Oops...",
              text: error.response.data.msg,
            });
            return error.response.data.msg;
          }
        }
      },

      //-----------------------------------------------------------------------------------------------------------------------------
      //											 GET USERS ADMIN
      //-----------------------------------------------------------------------------------------------------------------------------

      getUsers: async () => {
        try {
          const response = await fetch(process.env.BACKEND_URL + "/api/user"); // search
          const data = await response.json();
          // set store with the bringed data
          setStore({
            user: data,
          }); //promise
        } catch (err) {
          // standar error log
          console.log(err);
        }
        // details fetch
      },

      //-----------------------------------------------------------------------------------------------------------------------------
      //											PUT EDIT USERS ADMIN
      //-----------------------------------------------------------------------------------------------------------------------------

      adminUser: async (
        name,
        lastname,
        country,
        password,
        user_url,
        admin,
        premium,
        userId
      ) => {
        try {
          const response = await axios.put(
            process.env.BACKEND_URL + "/api/user/" + userId,
            {
              name: name,
              lastname: lastname,
              country: country,
              password: password,
              user_url: user_url,
              admin: admin,
              premium: premium,
            }
          );
          // sweetalert
          Swal.fire({
            position: "top",
            icon: "success",
            title: "Your profile has been updated",
            showConfirmButton: false,
            timer: 1500,
          });
          console.log(response);
        } catch (error) {
          // Log de error
          console.log(error);
          if (error.response.status === 404) {
            Swal.fire({
              icon: "error",
              title: "Oops...",
              text: error.response.data.msg,
            });
            return error.response.data.msg;
          }
        }
      },

      //-----------------------------------------------------------------------------------------------------------------------------
      //											 GET USERS DETAILS
      //-----------------------------------------------------------------------------------------------------------------------------

      getUserDetail: async (id) => {
        let store = getStore();
        try {
          const response = await fetch(
            process.env.BACKEND_URL + "/api/user/" + id
          );
          const data = await response.json();
          // console.log(data);
          setStore({
            userDetail: data,
            userId: data.id,
          });
          // console.log(store.userDetail);
          // console.log(store.userId);
          return store.userId;
        } catch (err) {
          console.log(err);
        }
      },

      //-----------------------------------------------------------------------------------------------------------------------------
      //											USER DELETE
      //-----------------------------------------------------------------------------------------------------------------------------

      deleteAccount: async () => {
        let store = getStore();
        let user_id = store.userId;
        try {
          const response = await axios.delete(
            process.env.BACKEND_URL + "/api/user/" + user_id,
            {}
          );
          console.log(response.data.msg);

          if (response.status === 200) {
            setStore({
              auth: false,
            });
            return response;
          }
        } catch (error) {
          console.log(error);
          if (error.response.status === 404) {
            Swal.fire(error.response.msg);
          }
        }
      },

      //-----------------------------------------------------------------------------------------------------------------------------
      //									ADMIN	USER DELETE
      //-----------------------------------------------------------------------------------------------------------------------------

      deleteUser: async (user_id) => {
        let store = getStore();
        try {
          const response = await axios.delete(
            process.env.BACKEND_URL + "/api/user/" + user_id,
            {
              data: {
                id_user: user_id,
              },
            }
          );
          getActions().getUsers();
          return;
        } catch (error) {
          console.log(error);
        }
      },

      //-----------------------------------------------------------------------------------------------------------------------------
      //											SIGNUP POST
      //-----------------------------------------------------------------------------------------------------------------------------

      signup: async (username, email, password) => {
        try {
          const response = await axios.post(
            process.env.BACKEND_URL + "/api/user",
            {
              username: username,
              email: email,
              password: password,
            }
          );
          if (response.data.msg === "New user created") {
            getActions().login(email, password);

            setStore({
              registered: true,
            });
          }
          return response.data.msg;
        } catch (error) {
          if (error.response.data.msg === "User exists") {
            return error.response.data.msg;
          }
        }
      },

      //-----------------------------------------------------------------------------------------------------------------------------
      //											 TOKEN GET
      //-----------------------------------------------------------------------------------------------------------------------------

      validToken: async () => {
        let accessToken = localStorage.getItem("token");
        try {
          const response = await axios.get(
            process.env.BACKEND_URL + "/api/valid-token",
            {
              headers: {
                Authorization: "Bearer " + accessToken,
              },
            }
          );
          if (response.data.user.admin) {
            setStore({
              admin: true,
              auth: true,
              userId: response.data.user.id,
            });
          } else if (response.data.user.premium) {
            setStore({
              premium: true,
              auth: true,
              userId: response.data.user.id,
            });
          } else {
            setStore({
              auth: true,
              userId: response.data.user.id,
            });
          }
          return;
        } catch (error) {
          if (error.code === "ERR_BAD_REQUEST") {
            setStore({
              auth: false,
            });
          }
          return false;
        }
      },

      //-----------------------------------------------------------------------------------------------------------------------------
      //											 LOGIN POST
      //-----------------------------------------------------------------------------------------------------------------------------

      login: async (email, password) => {
        try {
          const response = await axios.post(
            process.env.BACKEND_URL + "/api/login",
            {
              email: email,
              password: password,
            }
          );
          // Sets store with the user id and auth become true to give access
          // conditions to determine the user access level
          // if admin
          if (response.data.user.admin) {
            setStore({
              admin: true,
              auth: true,
              userId: response.data.user.id,
            });
            // if premium user
          } else if (response.data.user.premium) {
            setStore({
              premium: true,
              auth: true,
              userId: response.data.user.id,
            });
            // if standar user
          } else {
            setStore({
              auth: true,
              userId: response.data.user.id,
            });
          }
          // save token in local storage
          localStorage.setItem("token", response.data.msg);

          // window.localStorage.setItem("isLoggedIn", true); //-------permanent loged-------------------

          return response.data.msg;
        } catch (error) {
          // error codes
          if (error.response.status === 404) {
            Swal.fire({
              icon: "error",
              title: "Oops...",
              confirmButtonColor: "#000000",
              text: error.response.data.msg + "... redirecting to signup...",
            });
            return error.response.data.msg;
          } else if (error.response.data.msg === "Bad email or password") {
            Swal.fire({
              icon: "error",
              title: "Oops...",
              text: error.response.data.msg,
            });
            return error.response.data;
          }
        }
      },

      //-----------------------------------------------------------------------------------------------------------------------------
      //											 LOGOUT
      //-----------------------------------------------------------------------------------------------------------------------------

      logout: () => {
        localStorage.removeItem("token");

        // window.localStorage.removeItem("isLoggedIn");//-----------------------

        setStore({
          auth: false,
        });
        return false;
      },

      //-----------------------------------------------------------------------------------------------------------------------------
      //											 PASSWORD CHANGE POST
      //-----------------------------------------------------------------------------------------------------------------------------

      changePassword: async (email) => {
        try {
          const response = await axios.post(
            process.env.BACKEND_URL + "/api/user/password",
            {
              email: email,
            }
          );
          if (response.status === 200) {
            swal("Your password has been sent to your email");
          }
        } catch (error) {
          if (error.response.data.msg === "User email doesn't exist") {
            swal("Your email does not exist");
          }
        }
      },

	  //-----------------------------------------------------------------------------------------------------------------------------
      //											 GET SERVICES
      //-----------------------------------------------------------------------------------------------------------------------------

      getService: async () => {
        try {
          const response = await fetch(
            process.env.BACKEND_URL + "/api/service"
          ); // search
          const data = await response.json();
          // set store with the bringed data
          setStore({
            service: data,
          }); //promise
        } catch (err) {
          // standar error log
          console.log(err);
        }
        // details fetch
      },

      //-----------------------------------------------------------------------------------------------------------------------------
      //											 GET SERVICES DETAILS
      //-----------------------------------------------------------------------------------------------------------------------------

      getServiceDetail: async (id) => {
        let store = getStore();
        try {
          const response = await fetch(
            process.env.BACKEND_URL + "/api/service/" + id
          );
          const data = await response.json();
          // console.log(data);
          setStore({
            serviceDetail: data,
            serviceId: data.id,
          });
          // console.log(store.serviceDetail);
          // console.log(store.serviceId);
          return store.serviceId;
        } catch (err) {
          console.log(err);
        }
      },

      //-----------------------------------------------------------------------------------------------------------------------------
      //										SERVICES POST
      //-----------------------------------------------------------------------------------------------------------------------------

      createPackage: async (
        name,
        category,
        description,
        title,
        url,
        url1,
        url2
    
      ) => {
        try {
          const response = await axios.post(
            process.env.BACKEND_URL + "/api/service",
            {
              name: name,
              category: category,
              description: description,
              title: title,              
              url: url,
              url1: url1,
              url2: url2,
              
            }
          );
        } catch (error) {
          console.log(error);
        }
      },

      //-----------------------------------------------------------------------------------------------------------------------------
      //											PUT EDIT PACKAGES
      //-----------------------------------------------------------------------------------------------------------------------------

      updateService: async (
        name,
        category,
        description,
        title,
        url,
        url1,
        url2,
        serviceId
      ) => {
        let store = getStore();
        try {
          const response = await axios.put(
            process.env.BACKEND_URL + "/api/service/" + serviceId,
            {
              name: name,
              category: category,
              description: description,
              title: title,
              url: url,
              url1: url1,
              url2: url2,
            }
          );
          if (response.status === 200) {
            Swal.fire(response.data.msg);
            getActions().getServiceDetail();
            return response;
          }
          getActions().getServiceDetail();
        } catch (error) {
          // Log de error
          console.log(error);
          if (error.response.status === 404) {
            Swal.fire({
              icon: "error",
              title: "Oops...",
              text: error.response.data.msg,
            });
            return error.response.data.msg;
          }
        }
      },

      //-----------------------------------------------------------------------------------------------------------------------------
      //											 PACKAGE DELETE
      //-----------------------------------------------------------------------------------------------------------------------------

      deleteService: async (service_id) => {
        let store = getStore();
        try {
          const response = await axios.delete(
            process.env.BACKEND_URL + "/api/service/" + service_id,
            {
              data: {
                id_services: service_id,
              },
            }
          );
          getActions().getService();
          return;
        } catch (error) {
          console.log(error);
        }
      },

      //-----------------------------------------------------------------------------------------------------------------------------
      //						              	 SERVICES BY ID
      //-----------------------------------------------------------------------------------------------------------------------------

      // services map by id
      mapServiceId: async () => {
        let store = getStore();
        await getActions().getService();
        // console.log(store.service);
        setStore({
          servicesIds: store.service.map((item) => item.id),
        });
        // console.log(store.servicesIds);
      },

		}
	};
};

export default getState;
