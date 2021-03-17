import * as React from 'react';
import hoistStatics from 'hoist-non-react-statics';

interface HooksToPropsFunction<OwnProps, Props> {
  (ownProps: OwnProps): Props;
}

interface KonnektOptions {
  getDisplayName: (name: string) => string;
  displayName: string | undefined;
}

const defaultOptions: KonnektOptions = {
  getDisplayName: (name: string) => `Konnekt(${name})`,
  displayName: undefined,
};

function Konnekt<OwnProps, Props>(
  hooksToProps: HooksToPropsFunction<OwnProps, Props>,
  options: KonnektOptions = defaultOptions
) {
  return function(Component: React.ComponentType<OwnProps & Props>) {
    const Konnekted = function(props: OwnProps) {
      const hooksProps = hooksToProps(props);
      return <Component {...props} {...hooksProps} />;
    };
    Konnekted.displayName =
      options.displayName === undefined
        ? options.getDisplayName(Component.displayName || Component.name)
        : options.displayName;
    return hoistStatics(Konnekted, Component);
  };
}

export default Konnekt;
