import { JupyterFrontEnd, JupyterFrontEndPlugin } from '@jupyterlab/application';
import { IMySTNotebookOptions } from 'jupyterlab-myst';
import { MySTOptions, MySTNotebookDefaults } from 'jupyterlab-myst/lib/myst';
import { exampleDirective } from './directives';

/**
 * We implement a factory that returns myst options for a notebook:
 *
 *     interface MySTOptions {
 *       parserOptions: Partial<AllOptions>;
 *     }
 *
 * Here `AllOptions` is defined by the myst parser:
 *
 *     type AllOptions = {
 *       vfile: VFile;
 *       markdownit: MarkdownIt.Options;
 *       extensions: {
 *         colonFences?: boolean;
 *         frontmatter?: boolean;
 *         math?: boolean | MathExtensionOptions;
 *         footnotes?: boolean;
 *         deflist?: boolean;
 *         tasklist?: boolean;
 *         tables?: boolean;
 *         blocks?: boolean;
 *       };
 *       mdast: MdastOptions;
 *       directives: DirectiveSpec[];
 *       roles: RoleSpec[];
 *     };
 *
 * The concept is to assemble these options from sources such as:
 *
 * - jupyterlab settings
 * - notebook metadata
 * - whatever can be associated to a notebook instance
 *
 * In this toy example the notebook instance is ignored.
 * We simply turn off math and create a new directive.
 */
export class PocNotebookDefaults extends MySTNotebookDefaults {

  get(notebook: any): MySTOptions {
    const defaults = super.get(notebook);
    (defaults.parserOptions.extensions ||= {}).math = false;
    (defaults.parserOptions.directives ||= []).push(exampleDirective);
    return defaults;
  }
}

/**
 * Initialization data for the myst-options-poc extension.
 *
 * We declare `provides: IMySTNotebookOptions` so that
 * `jupyterlab-myst` receives our `PocNotebookDefaults` instance.
 */
const plugin: JupyterFrontEndPlugin<PocNotebookDefaults> = {
  id: 'myst-options-poc:plugin',
  autoStart: true,
  provides: IMySTNotebookOptions,
  activate: (app: JupyterFrontEnd) => {
    console.log('JupyterLab extension myst-options-poc is activated!');
    return new PocNotebookDefaults();
  }
};

export default plugin;
