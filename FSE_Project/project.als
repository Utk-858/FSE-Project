module WeatherMonitoringSystem

// Abstract system component
abstract sig Component {}

sig Sensor extends Component {
    metric: one WeatherMetric,
    connectedTo: one Microcontroller
}

sig Microcontroller extends Component {
    receives: set Sensor,
    sendsTo: one BackendServer
}

sig BackendServer extends Component {
    storesIn: one Database,
    sendsTo: one Dashboard
}

sig Database extends Component {
    stores: set WeatherMetric
}

sig Dashboard extends Component {
    displays: set WeatherMetric
}

// Weather metrics
abstract sig WeatherMetric {}
one sig Temperature, Humidity, Pressure, AirQuality extends WeatherMetric {}


// FACTS

fact SensorMustBeConnected {
    all s: Sensor | one s.connectedTo
}

fact MicrocontrollerReceivesCorrectly {
    all m: Microcontroller |
        all s: m.receives | s.connectedTo = m
}

fact MicrocontrollerHasBackend {
    all m: Microcontroller | one m.sendsTo
}

fact BackendIsConnected {
    all b: BackendServer | one b.storesIn and one b.sendsTo
}

// Relaxed this fact slightly to allow Alloy to find instances
fact BackendStoresMetrics {
    all b: BackendServer |
        all s: Sensor |
            s.metric in b.storesIn.stores
}

// Relaxed this to allow Dashboard to display some metrics from the DB
fact DashboardDataConsistency {
    all d: Dashboard |
        all m: d.displays |
            some db: Database | m in db.stores
}

// FACT to support traceability, but loosened to allow instance generation
fact MetricTraceability {
    all m: WeatherMetric |
        some s: Sensor | s.metric = m =>
            some mcu: Microcontroller | s.connectedTo = mcu and
            some b: BackendServer | mcu.sendsTo = b
}


// ASSERTIONS

assert NoDisconnectedSensors {
    all s: Sensor | some s.connectedTo
}

assert ValidDataFlow {
    all s: Sensor |
        let mcu = s.connectedTo |
        let backend = mcu.sendsTo |
        let db = backend.storesIn |
        let dash = backend.sendsTo |
        s in mcu.receives and
        s.metric in db.stores and
        s.metric in dash.displays
}

assert NoRedundantMetricsInDashboard {
    all d: Dashboard | all m: d.displays |
        some s: Sensor | s.metric = m
}


// CHECKS

check NoDisconnectedSensors for 5
check ValidDataFlow for 5
check NoRedundantMetricsInDashboard for 5


// 👇 DIAGRAM GENERATION

pred showInstance {
    some Sensor and some Microcontroller and some BackendServer and some Dashboard and some Database
    all s: Sensor | some s.metric
    all d: Dashboard | some d.displays
}

run showInstance for 5
