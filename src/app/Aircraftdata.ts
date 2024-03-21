export  class  Aircraftdata {
    id: number;
    aircraftTypeName:  any;
    make:  any;
    NoOfAircraft:  any;
}

export  class  AircraftListdata {
    id: number;
    aircraftType:  string;
    firstCapacity:  number;
    businessCapacity:  number;
    peconomyCapacity:  number;
    economyCapacity:  number;
    cargoCapacity:  number;
    aregistration:  string;
    countryOfRegistration:  string;
    dateOfRegistration:  any;
    airportCategory:  string;
    maximumFlightHours:  string;
    status:  string;
    saircarft : string;
}

export  class  AircraftListMaintenance {
    id: number;
    aircraftType:  string;
    aregistration:  string;
}

export  class  MaintainanceList {
    id: number;
    maintenanceCode: string;
    maintenanceName: String;
    durationHours: number;
    aircraftType : number;
}

export  class  MaintainanceSched {
    id: number;
    resourceIdMaintenance: number;
    maintenanceId: number;
    aircraftId: number;
    scheduleFrom: string;
    scheduleTo : string;
}