import { addRoad, RoadType } from './roads'
import { checkTime, TramSystem } from './scheduler'
import { RoadOrientation } from './station'
import { setTramType, TranType } from './tram'

Input.instance.subscribe('BUTTON_DOWN', ActionButton.PRIMARY, false, (e) => {
  log(`pos: `, Camera.instance.position)
  log(`rot: `, Camera.instance.rotation)
})

let sceneOrientation: RoadOrientation = RoadOrientation.horizontal

let trackLength: number = 97

let stationCount: number = 3

let cycleTime: number = 250 //180 //(56 / 180) * trackLength

let exceptions: RoadType[] = []

exceptions[6] = RoadType.ROADLEFT

// exceptions[15] = RoadType.ROADBOTH
// exceptions[11] = RoadType.WROADRIGHT2

// exceptions[21] = RoadType.WROADBOTH1
// exceptions[22] = RoadType.WROADBOTH2

// exceptions[32] = RoadType.STATION
// exceptions[33] = RoadType.STATION
// exceptions[34] = RoadType.STATION

exceptions[50] = RoadType.WROADBOTH1
exceptions[51] = RoadType.WROADBOTH2

// exceptions[53] = RoadType.ROADRIGHT
// exceptions[56] = RoadType.ROADRIGHT
// exceptions[59] = RoadType.ROADRIGHT

setTramType(TranType.forest)

addRoad(trackLength + 2, sceneOrientation, exceptions)

// Input.instance.subscribe('BUTTON_DOWN', ActionButton.PRIMARY, true, (e) => {
//   if (e.hit) {
//     console.log(
//       'POS: ',
//       engine.entities[e.hit.entityId].getComponent(Transform)
//     )
//   }
// })

let tranSystem = new TramSystem(
  cycleTime,
  10,
  stationCount,
  sceneOrientation,
  trackLength
)

engine.addSystem(tranSystem)

// when scene finishes loading
onSceneReadyObservable.add(async () => {
  let currenTime = await checkTime()

  log('GOT CURRENT TIME ', currenTime)

  currenTime += tranSystem.timeOffset

  tranSystem.time = currenTime % tranSystem.cycleTime
  tranSystem.addTrams()
})
