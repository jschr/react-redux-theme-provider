import * as React from 'react'
import { createStore, Unsubscribe } from 'redux'

import themeReducer, { ThemeState } from './themeReducer'
import themeEnhancer, { ThemeStore } from './themeEnhancer'
import themeStoreShape from './themeStoreShape'

export interface StylesProps {
  styles: any
}

export default function withStyles<P>(
  createStyles: (themeState: ThemeState) => any
) {
  return function createComponent(
    BaseComponent: React.ComponentClass<P & StylesProps> | React.StatelessComponent<P & StylesProps>
  ): React.ComponentClass<P> {
    class WrappedComponent extends React.PureComponent<P, { styles: any }> {
      public static displayName = `withStyles(${BaseComponent.displayName || 'Component'})`

      public static contextTypes = {
        theme: themeStoreShape.isRequired
      }

      private theme: ThemeStore
      private unsubscribe: Unsubscribe

      public render() {
        return <BaseComponent {...this.props} styles={this.state.styles} />
      }

      private componentWillMount() {
        const { theme } = this.context

        this.updateStyles()

        if (typeof createStyles === 'function') {
          this.unsubscribe = theme.subscribe(() => {
            this.updateStyles()
          })
        }
      }

      private componentWillUnmount() {
        if (this.unsubscribe) this.unsubscribe()
      }

      private updateStyles() {
        const { theme } = this.context

        this.setState({
          styles: typeof createStyles === 'function'
            ? createStyles(theme.getState())
            : createStyles
        })
      }
    }

    return WrappedComponent
  }
}
