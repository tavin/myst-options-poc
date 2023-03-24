import {
  JupyterFrontEnd,
  JupyterFrontEndPlugin
} from '@jupyterlab/application';

/**
 * Initialization data for the myst-options-poc extension.
 */
const plugin: JupyterFrontEndPlugin<void> = {
  id: 'myst-options-poc:plugin',
  autoStart: true,
  activate: (app: JupyterFrontEnd) => {
    console.log('JupyterLab extension myst-options-poc is activated!');
  }
};

export default plugin;
