import React from 'react';
import { StandardReality, Environment, Physics, Player, Toolbelt, Network, Visual } from 'spacesvr';

const CustomReality = ({ children, playerProps, eyeLevel, ...props }) => {
  return (
    <StandardReality
      {...props}
      playerProps={playerProps}
    >
      <Environment>
        <Physics>
          <Player
            {...playerProps}
            eyeLevel={eyeLevel} // Add the custom eyeLevel prop
          >
            <Toolbelt>
              <Network>
                <Visual>{children}</Visual>
              </Network>
            </Toolbelt>
          </Player>
        </Physics>
      </Environment>
    </StandardReality>
  );
};

export default CustomReality;