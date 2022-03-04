import React, {useEffect, useState} from 'react';
import browserHistory from '../../browser-history';
import {AppRoute, TimerValue} from '../../const';

const paths = Object.values(AppRoute);

const getLightName = (path) => path.slice(1);

const renderLightItem = (path) => {
  return paths.map((item, i) => {
    return (
      <div
        className={`circle ${getLightName(item)} ${item === path ? `` : `pale`}`}
        key={i}
      ></div>
    );
  });
};

const renderLights = (path) => {
  switch (path) {
    case `/red`:
      return renderLightItem(path);
    case `/yellow`:
      return renderLightItem(path);
    case `/green`:
      return renderLightItem(path);
    default:
      return (<div>ERROR</div>);
  }
};


let prevLight;

const setLightTimeout = (light, cb) => {

  // const setPath = (i) => {
  //   console.log(`inside`);

  //   cb((prevState) => {
  //     console.log(`prevState: ${prevState}`);
  //     if (prevState === `red`) {
  //       browserHistory.push(paths[i + 1]);
  //       return paths[i + 1];
  //     }
  //     if (prevState === `green`) {
  //       browserHistory.push(paths[i - 1]);
  //       return paths[i - 1];
  //     }
  //   });
  // };


  switch (light) {
    case `red`:
      return setTimeout(() => {
        browserHistory.push(AppRoute.YELLOW);
        cb(AppRoute.YELLOW);
        prevLight = AppRoute.RED;
      }, TimerValue.RED);

    case `yellow`:
      return setTimeout(() => {
        if (prevLight === AppRoute.RED) {
          browserHistory.push(AppRoute.GREEN);
          cb(AppRoute.GREEN);
        } else {
          browserHistory.push(AppRoute.RED);
          cb(AppRoute.RED);
        }
      }, TimerValue.YELLOW);

    case `green`:
      return setTimeout(() => {
        browserHistory.push(AppRoute.YELLOW);
        cb(AppRoute.YELLOW);
        prevLight = AppRoute.GREEN;
      }, TimerValue.GREEN);

    default:
      throw new Error(`invalid path: ${light}`);
  }
};

// const switchLights = (light, cb) => {
//   switch (light) {
//     case paths[0]:
//       setLightTimeout(getLightName(light), cb);
//       break;
//     case paths[1]:
//       setLightTimeout(getLightName(light), cb);
//       break;
//     case paths[2]:
//       setLightTimeout(getLightName(light), cb);
//       break;
//     default:
//       throw new Error(`invalid path: ${light}`);
//   }
// };


const Streetlight = ({match}) => {
  // const light = match.path;
  const [light, setLight] = useState(match.path);

  useEffect(() => {
    setLightTimeout(getLightName(light), setLight);
  }, [light]);

  return (
    <div className="streetlight">
      { renderLights(light) }
    </div>
  );
};

export default Streetlight;
