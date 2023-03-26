import type { Admonition } from 'myst-spec-ext';
import type { DirectiveSpec, DirectiveData, GenericNode } from 'myst-common';
import { ParseTypesEnum } from 'myst-common';

/**
 * This demonstrates adding a new directive.
 *
 *     ::: {example}
 *     I look like an admonition without an icon.
 *     :::
 */
export const exampleDirective: DirectiveSpec = {

  name: 'example',

  alias: ['eg'],

  arg: {
    type: ParseTypesEnum.parsed,
  },

  body: {
    type: ParseTypesEnum.parsed,
  },

  run(data: DirectiveData): GenericNode[] {
    const children: GenericNode[] = [];
    if (data.arg) {
      children.push({
        type: 'admonitionTitle',
        children: data.arg as GenericNode[],
      });
    }
    if (data.body) {
      children.push(...(data.body as GenericNode[]));
    }
    return [
      {
        type: 'admonition',
        icon: false,
        children: children,
      } as Admonition
    ];
  },
};
