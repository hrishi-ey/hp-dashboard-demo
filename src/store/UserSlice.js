import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { BasicAuth, BearerAuth, Client, CookieAuth, FetchClient, Severity } from "@c8y/client";

const initialState = {
  loading: false,
  client: null,
  user: null,
  inventory: null,
  error: null
};

function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

const URL = import.meta.env.VITE_BASE_API_URL;
const TENANT = import.meta.env.VITE_TENANT;

const randomMarkerPositions = [
  {"latitude": 44.3538, "longitude": -115.5778, num: 80},
  {"latitude": 28.4808, "longitude": -106.9792, num: 60},
  {"latitude": 43.5493, "longitude": -110.7, num: 80},
  {"latitude": 33.0211, "longitude": -84.5592, num: 80},
  {"latitude": 36.7284, "longitude": -94.5588, num: 74},
  {"latitude": 34.7660, "longitude": -75.6192, num: 90},
  {"latitude": 47.5214, "longitude": -69.6841, num: 60},
  {"latitude": 36.0827, "longitude": -100.6386, num: 80},
  {"latitude": 30.4409, "longitude": -99.3631, num: 80},
  {"latitude": 37.9591, "longitude": -117.7505, num: 90},
  {"latitude": 33.7896, "longitude": -115.9180, num: 80},
  {"latitude": 33.8121, "longitude": -84.9516, num: 60},
  {"latitude": 28.8966, "longitude": -106.3568, num: 80},
  {"latitude": 30.9416, "longitude": -69.6377, num: 80},
  {"latitude": 47.3215, "longitude": -90.3980, num: 80},
  {"latitude": 36.8948, "longitude": -109.9604, num: 80},
  {"latitude": 36.4972, "longitude": -120.3334, num: 80},
  {"latitude": 24.8876, "longitude": -85.0026, num: 50},
  {"latitude": 42.9257, "longitude": -86.8200, num: 90},
  {"latitude": 38.2245, "longitude": -99.9497, num: 80}
];

export let user = null;
export let client = null;
let inventory = {
  userType: null,
  owners: {
    uptime: 0,
    operation: 0,
    efficiency: 0,
    registeredEquipements: 0,
    onlineEquipments: 0,
    operators: 0,
    locations: 0,
    errors: [],
    children: []
  },
  stores: {
    uptime: 0,
    operation: 0,
    efficiency: 0,
    registeredEquipements: 0,
    onlineEquipments: 0,
    operators: 0,
    locations: 0,
    errors: [],
    children: []
  },
  devices: {
    children: []
  }
};

export const loginUser = createAsyncThunk(
  "user/loginUser",
  async(creds) => {
    try {

      // const auth = new CookieAuth({
      //   user: creds.email,
      //   password: creds.password,
      //   tenant: TENANT
      // });
      
      // client = new Client(auth, URL);
      // client.setAuth(auth);
      // const fetchClient = client.core;
      client = await Client.authenticateViaOAuthInternal({user: creds.email, password: creds.password}, "https://dev.hennypenny.com");
      // let auth = new CookieAuth();
      
      user = await client.user.currentWithEffectiveRoles();
      const inv = await client.inventory.list({pageSize: 500, withChildren: true, withParents: true});

      console.log("test 1");
      // inv.data.sort((a,b) => {
      //   if(a.name < b.name) {return -1;}
      //   if(a.name > b.name) {return 1;}
      //   return 0;
      // });
      
      if(inv.data && inv.data.length > 0) {
        
        for (let index = 0; index < inv.data.length; index++) {
          const element = inv.data[index];
          if(element.type === "c8y_DeviceGroup") {
            if(inventory.userType === null) {
              inventory.userType = "admin";
              inventory.uptime = getRandomInt(50, 100);
              inventory.operation = getRandomInt(50, 80);
              inventory.efficiency = getRandomInt(50, 100);
              inventory.registeredEquipements = getRandomInt(10, 200);
              inventory.onlineEquipments = inventory.registeredEquipements - 5;
              inventory.operators = parseInt(inventory.registeredEquipements / 4);
              inventory.locations = inventory.operators + getRandomInt(10, 20);
              inventory.errors = ["High frequency if E-10's Observed"];
              inventory.oilEfficiency = getRandomInt(50, 100);
              inventory.energyEfficiency = getRandomInt(50, 100);
              inventory.vatUtilization = getRandomInt(50, 100);
              inventory.maintenanceFilter = getRandomInt(50, 100);
              inventory.expressFilter = getRandomInt(50, 100);
              inventory.mainFilter = getRandomInt(50, 100);
            }
          } else if(element.type === "c8y_DeviceSubgroup" && element.name.includes("Owner")) {
            if(inventory.userType === null) {
              inventory.userType = "owner";
            }
            element.uptime = getRandomInt(50, 100);
            element.operation = getRandomInt(50, 90);
            element.efficiency = getRandomInt(50, 100);
            element.registeredEquipements = getRandomInt(10, 200);
            element.onlineEquipments = element.registeredEquipements - 5;
            element.operators = parseInt(element.registeredEquipements / 4);
            element.locations = element.operators + getRandomInt(10, 20);
            element.oilEfficiency = getRandomInt(50, 100);
            element.energyEfficiency = getRandomInt(50, 100);
            element.vatUtilization = getRandomInt(50, 100);
            element.maintenanceFilter = getRandomInt(50, 100);
            element.expressFilter = getRandomInt(50, 100);
            element.mainFilter = getRandomInt(50, 100);
            element.children = [];
            if(inventory.owners.uptime === 0) {
              inventory.owners.uptime = getRandomInt(50, 100);
              inventory.owners.operation = getRandomInt(50, 90);
              inventory.owners.efficiency = getRandomInt(50, 100);
              inventory.owners.registeredEquipements = getRandomInt(10, 200);
              inventory.owners.onlineEquipments = inventory.owners.registeredEquipements - 5;
              inventory.owners.operators = parseInt(inventory.owners.registeredEquipements / 4);
              inventory.owners.locations = inventory.owners.operators + getRandomInt(10, 20);
              inventory.owners.oilEfficiency = getRandomInt(50, 100);
              inventory.owners.energyEfficiency = getRandomInt(50, 100);
              inventory.owners.errors = ["High frequency if E-10's Observed"];
              inventory.owners.vatUtilization = getRandomInt(50, 100);
              inventory.owners.maintenanceFilter = getRandomInt(50, 100);
              inventory.owners.expressFilter = getRandomInt(50, 100);
              inventory.owners.mainFilter = getRandomInt(50, 100);
            }
            if(getRandomInt(1, 10) > 5) {
              element.errors = ["High frequency if E-10's Observed"];
            } else {
              element.errors = [];
            }
            inventory.owners.children.push(element);            
          } else if(element.type === "c8y_DeviceSubgroup" && element.name.includes("Store")) {
            if(inventory.userType === null) {
              inventory.userType = "store";
            }
            element.uptime = getRandomInt(50, 100);
            element.operation = getRandomInt(50, 90);
            element.registeredEquipements = getRandomInt(10, 200);
            element.onlineEquipments = element.registeredEquipements - 5;
            element.operators = parseInt(element.registeredEquipements / 4);
            element.locations = element.operators + getRandomInt(10, 20);
            element.efficiency = getRandomInt(50, 100);
            element.oilEfficiency = getRandomInt(50, 100);
            element.energyEfficiency = getRandomInt(50, 100);
            element.vatUtilization = getRandomInt(50, 100);
            element.maintenanceFilter = getRandomInt(50, 100);
            element.expressFilter = getRandomInt(50, 100);
            element.mainFilter = getRandomInt(50, 100);
            element.children = [];
            if(inventory.stores.uptime === 0) {
              inventory.stores.uptime = getRandomInt(50, 100);
              inventory.stores.operation = getRandomInt(50, 90);
              inventory.stores.efficiency = getRandomInt(50, 100);
              inventory.stores.registeredEquipements = getRandomInt(10, 200);
              inventory.stores.onlineEquipments = inventory.stores.registeredEquipements - 5;
              inventory.stores.operators = parseInt(inventory.stores.registeredEquipements / 4);
              inventory.stores.locations = inventory.stores.operators + getRandomInt(10, 20);
              inventory.stores.errors = ["High frequency if E-10's Observed", "High frequency if E-10's Observed", "High frequency if E-10's Observed", "High frequency if E-10's Observed", "High frequency if E-10's Observed"];
              inventory.stores.oilEfficiency = getRandomInt(50, 100);
              inventory.stores.energyEfficiency = getRandomInt(50, 100);
              inventory.stores.vatUtilization = getRandomInt(50, 100);
              inventory.stores.maintenanceFilter = getRandomInt(50, 100);
              inventory.stores.expressFilter = getRandomInt(50, 100);
              inventory.stores.mainFilter = getRandomInt(50, 100);
            }
            if(getRandomInt(1, 10) > 5) {
              element.errors = ["High frequency if E-10's Observed"];
            } else {
              element.errors = [];
            }
            inventory.stores.children.push(element);
            if(!element.address) {
              let randomLocation = randomMarkerPositions[getRandomInt(0, 20)];
              if(!randomLocation) {
                randomLocation = randomMarkerPositions[0];
              }
              element.address = {name: "Eaton - MCD", zip: "411041", country: "USA", city: "New York", line1: "1317 N Barron St, Eaton, OH 45320", position: {lat: randomLocation.latitude, lng: randomLocation.longitude}};
            }
          } else if(element.type === "F5") {
            element.uptime = getRandomInt(50, 100);
            element.operation = getRandomInt(50, 90);
            element.efficiency = getRandomInt(50, 100);
            element.oilEfficiency = getRandomInt(50, 100);
            element.energyEfficiency = getRandomInt(50, 100);
            element.vatUtilization = getRandomInt(50, 100);
            element.maintenanceFilter = getRandomInt(50, 100);
            element.expressFilter = getRandomInt(50, 100);
            element.mainFilter = getRandomInt(50, 100);
            element.errors = [];

            if(getRandomInt(1,10) > 5) {
              element.errors.push("High frequency if E-10's Observed");
            }

            if(!element.model) {
              element.model = "LVE303FFF";
            }
            if(!element.address) {
              element.address = {name: "Eaton - MCD", zip: "411041", country: "USA", city: "New York", line1: "1317 N Barron St, Eaton, OH 45320"};
            }
            for (let i1 = 0; i1 < inventory.stores.children.length; i1++) {
              const store = inventory.stores.children[i1];
              const childRefs = store.childAssets.references;
              for (let i2 = 0; i2 < childRefs.length; i2++) {
                const childRef = childRefs[i2];
                if(childRef.managedObject.id === element.id) {
                  element.parentId = store.id;
                  element.directParentName = store.name;
                }
              }
              
            }
            inventory.devices.children.push(element);
          }
        }
      }
      // const userGroups = await client.userGroup.list({pageSize: 200, withTotalPages: true});
    } catch(e) {
      console.log(e);
    }

    // const query = {id: "373317", groupType: "c8y_DeviceSubgroup"};
    // const inventory = await client.inventory.listQuery(query, {pageSize: 5, withChildren: true });
    // const inventory = await client.inventory.list({pageSize: 500, withChildren: true });
    // const inventory = await client.inventory.childAssetsList("373317", {pageSize: 500 });
    // Store_1_1_1
    // OnwerOperator_1_2
    // client.user.userRole.list();
    
    // if(inventory.data && inventory.data.length > 0) {
    //   for (let index = 0; index < inventory.data.length; index++) {
        
    //     const element = inventory.data[index];
    //     if(element.type === "c8y_DeviceGroup") {
    //       if(userType === null) {
    //         userType = "admin";
    //       }
    //     }
    //     if(element.type === "c8y_DeviceSubgroup") {
    //       if(userType === null && element.name.includes("Distributor")) {
    //         userType = "distributor";
    //         element.uptime = getRandomInt(50, 10);
    //         element.operation = getRandomInt(50, 10);
    //         element.efficiency = getRandomInt(50, 10);
    //       } else if(userType === null && element.name.includes("Owner")) {
    //         userType = "ownerOperator";
    //         element.uptime = getRandomInt(50, 10);
    //         element.operation = getRandomInt(50, 10);
    //         element.efficiency = getRandomInt(50, 10);
    //       } else if(userType === null && element.name.includes("Store")) {
    //         userType = "storeManager";
    //         element.uptime = getRandomInt(50, 10);
    //         element.operation = getRandomInt(50, 10);
    //         element.efficiency = getRandomInt(50, 10);
    //       }
    //     }
    //     if(element.type === "F5") {
    //       element.uptime = getRandomInt(50, 10);
    //       element.operation = getRandomInt(50, 10);
    //       element.efficiency = getRandomInt(50, 10);
    //       mappedInventory.devices.push(element);
    //     }
    //     mappedInventory[element.name] = element;
    //   }
    // }
    
    return {user: user.data, inventory};
  }
);

export const getAlarms = createAsyncThunk("user/alarms", async() => {
  console.log(client);
});

export const getInventoryById = createAsyncThunk(
  "user/x",
  async() => {
    return "data";
  }
);

export const logoutUser = createAsyncThunk(
  "user/logoutUser",
  async() => {
    await user.logout();
    state.loading = false;
    state.client = null;
    state.user = null;
    state.error = null;
    return true;
  }
);

export const isLoggedIn = createAsyncThunk("user/isLoggedIn",
  async() => {
    console.log(user, "--- from is logged in");
    
    if(user !== null) {
      return true;
    }
    return false;
  }
);

const userSlice = createSlice({
  name: "user",
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.user = null;
        state.inventory = null;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
        state.inventory = action.payload;
        state.error = null;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.user = null;
        state.inventory = null;
        state.error = "Invalid Credentials";
      });
  }
});

export default userSlice.reducer;