import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { BasicAuth, BearerAuth, Client, CookieAuth, FetchClient, Severity } from "@c8y/client";
import { persistor } from "./index";

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

export let api = { client: null, user: null };
let inventory = {
  userRole: null,
  baseData: null,
  owners: {
    children: []
  },
  stores: {
    children: []
  },
  devices: {
    children: []
  },
};

export const loginUser = createAsyncThunk(
  "user/loginUser",
  async(creds) => {

    try {
        api.client = await Client.authenticateViaOAuthInternal({user: creds.email, password: creds.password}, "https://dev.hennypenny.com");    
        if(api.client) {
          api.user = await api.client.user.currentWithEffectiveRoles({pageSize: 500});
        }
        let inv = await api.client.inventory.list({ pageSize: 500, withChildren: true });

        if(inv.data && inv.data.length > 0) {
          
          for (let index = 0; index < inv.data.length; index++) {
            const element = inv.data[index];
            if(element.type === "KPI_measurement" && element.name === "HennyPenny") {
              if(inventory.userRole === null) {
                inventory.userRole = "admin";
                inventory.baseData = element;
                inventory.baseData.adminKPI.errors = ["High frequency if E-10's Observed", "High frequency if E-10's Observed"];
                inventory.baseData.oilEfficiency = getRandomInt(50, 100);
                inventory.baseData.energyEfficiency = getRandomInt(50, 100);
                inventory.baseData.vatUtilization = getRandomInt(50, 100);
                inventory.baseData.maintenanceFilter = getRandomInt(50, 100);
                inventory.baseData.expressFilter = getRandomInt(50, 100);
                inventory.baseData.mainFilter = getRandomInt(50, 100);
              }
            } else if(element.type === "KPI_measurement" && element.hp_GroupType === "OwnerOperator") {
              if(inventory.userRole === null) {
                inventory.userRole = "owner";
                inventory.baseData = element;
                if(getRandomInt(1, 10) > 3) {
                  inventory.baseData.ownerKPI.errors = ["High frequency if E-10's Observed"];
                } else {
                  inventory.baseData.ownerKPI.errors = [];
                }
                inventory.baseData.oilEfficiency = getRandomInt(50, 100);
                inventory.baseData.energyEfficiency = getRandomInt(50, 100);
                inventory.baseData.vatUtilization = getRandomInt(50, 100);
                inventory.baseData.maintenanceFilter = getRandomInt(50, 100);
                inventory.baseData.expressFilter = getRandomInt(50, 100);
                inventory.baseData.mainFilter = getRandomInt(50, 100);
              } else {
                if(getRandomInt(1, 10) > 3) {
                  element.ownerKPI.errors = ["High frequency if E-10's Observed"];
                } else {
                  element.ownerKPI.errors = [];
                }
                element.oilEfficiency = getRandomInt(50, 100);
                element.energyEfficiency = getRandomInt(50, 100);
                element.vatUtilization = getRandomInt(50, 100);
                element.maintenanceFilter = getRandomInt(50, 100);
                element.expressFilter = getRandomInt(50, 100);
                element.mainFilter = getRandomInt(50, 100);
                inventory.owners.children.push(element);
              }

            } else if(element.type === "KPI_measurement" && element.hp_GroupType === "Store") {
              if(inventory.userRole === null) {
                inventory.userRole = "store";
                inventory.baseData = element;
                if(getRandomInt(1, 10) > 3) {
                  inventory.baseData.storeKPI.errors = ["High frequency if E-10's Observed"];
                } else {
                  inventory.baseData.storeKPI.errors = [];
                }
                inventory.baseData.oilEfficiency = getRandomInt(50, 100);
                inventory.baseData.energyEfficiency = getRandomInt(50, 100);
                inventory.baseData.vatUtilization = getRandomInt(50, 100);
                inventory.baseData.maintenanceFilter = getRandomInt(50, 100);
                inventory.baseData.expressFilter = getRandomInt(50, 100);
                inventory.baseData.mainFilter = getRandomInt(50, 100);
                inventory.baseData.position = {lat: randomLocation.latitude, lng: randomLocation.longitude};
              } else {
                let randomLocation = randomMarkerPositions[getRandomInt(0, 20)];
                if(!randomLocation) {
                  randomLocation = randomMarkerPositions[0];
                }
                element.position = {lat: randomLocation.latitude, lng: randomLocation.longitude};
                if(getRandomInt(1, 10) > 3) {
                  element.storeKPI.errors = ["High frequency if E-10's Observed"];
                } else {
                  element.storeKPI.errors = [];
                }
                element.oilEfficiency = getRandomInt(50, 100);
                element.energyEfficiency = getRandomInt(50, 100);
                element.vatUtilization = getRandomInt(50, 100);
                element.maintenanceFilter = getRandomInt(50, 100);
                element.expressFilter = getRandomInt(50, 100);
                element.mainFilter = getRandomInt(50, 100);
                inventory.stores.children.push(element);
              }
            } else if(element.type === "F5") {
              if(getRandomInt(1, 10) > 5) {
                element.errors = ["High frequency if E-10's Observed"];
              } else {
                element.errors = [];
              }
              element.uptimeIndicator = getRandomInt(0, 4);
              element.uptime = getRandomInt(50, 100);
              element.operation = getRandomInt(50, 90);
              element.efficiency = getRandomInt(50, 100);
              element.oilEfficiency = getRandomInt(50, 100);
              element.oilEfficiencyIndicator = getRandomInt(2, 4);
              element.energyEfficiency = getRandomInt(50, 100);
              element.energyEfficiencyIndicator = getRandomInt(2, 4);
              element.vatUtilization = getRandomInt(50, 100);
              element.vatUtilizationIndicator = getRandomInt(2, 4);
              element.maintenanceFilter = getRandomInt(50, 100);
              element.maintenanceFilterIndicator = getRandomInt(2, 4);
              element.expressFilter = getRandomInt(50, 100);
              element.expressFilterIndicator = getRandomInt(2, 4);
              element.mainFilter = getRandomInt(50, 100);
              element.dailyFilter = getRandomInt(50, 100);
              inventory.devices.children.push(element);
            }
          }
        }
        console.log(inventory, "--- inventory");

      } catch(e) {
        console.log(e);
      }
      return {user: {id: api.user.data.id, role: null, isLoggedIn: true}, inventory: inventory};
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


export const getInventory = createAsyncThunk(
  "user/getInventory",
  async() => {
    let inventory = {
      userType: "",
      baseData: {},
      owners: [],
      stores: [],
      devices: []
    };

    try {
      let inv = await api.client.inventory.list({ pageSize: 500, withChildren: true });
    } catch(e) {
      console.log(e);
    }
  }
);


export const logoutUser = createAsyncThunk(
  "user/logoutUser",
  async() => {
    try {
      await persistor.purge();
    } catch(e) {
      console.log(e);
    }
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
        state.error = false;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.user;
        state.inventory = action.payload.inventory;
        state.error = false;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.user = null;
        state.inventory = null;
        state.error = true;
      });
  }
});

export default userSlice.reducer;