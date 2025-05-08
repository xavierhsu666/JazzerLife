// ! -- Global Area ----------------------------------------------------------------------
// var car_Vehicles_DBName = "[ME_Planning].[OMT].[DX_JZ_Vehicles]";
// var car_OilCon_DBName = "[ME_Planning].[OMT].[DX_JZ_FuelConsumption]";
// var car_MaintainTable_DBName = "[ME_Planning].[OMT].[DX_JZ_MaintenanceCycles]";
// var mem_User_DBName = "[ME_Planning].[OMT].[DX_JZ_Users]";

var car_Vehicles_DBName = "[JazzerLife].[CarMan].[Vehicles]";
var car_OilCon_DBName = "[JazzerLife].[CarMan].[FuelConsumption]";
var car_MaintainTable_DBName = "[JazzerLife].[CarMan].[MaintenanceCycles]";
var mem_User_DBName = "[JazzerLife].[MEM].[Users]";


var s = location.pathname;
var t = (url = location.href);
sourcePage = t.split("#")[1];
var loader_animate = {
    // load animation
    load_start: function () {
        $('.loading-state').removeClass('d-none')
    },
    load_end: function () {
        $('.loading-state').addClass('d-none')
    }
}
