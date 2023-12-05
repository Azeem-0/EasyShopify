// return screen ? <AutoplaySlider>
//     < div >
//         <div className="top-picks-cards">
//             {topPicks.slice(0, 3).map((ele, ind) => {
//                 return <Toppicks key={ind} heading={ele.heading} image={ele.img} />
//             })}
//         </div>
//     </div >
//     <div>
//         <div className="top-picks-cards">
//             {topPicks.slice(3, 6).map((ele, ind) => {
//                 return <Toppicks key={ind} heading={ele.heading} image={ele.img} />
//             })}
//         </div>
//     </div>
//     <div>
//         <div className="top-picks-cards">
//             {topPicks.slice(6, 10).map((ele, ind) => {
//                 return <Toppicks key={ind} heading={ele.heading} image={ele.img} />
//             })}
//         </div>
//     </div></AutoplaySlider > :
//     <AutoplaySlider infinite play={true} cancelOnInteraction={true} interval={1000}>
//         {topPicks.map((ele, ind) => {
//             return <div key={ind}><Toppicks key={ind} heading={ele.heading} image={ele.img} /></div>
//         })}
//     </AutoplaySlider>