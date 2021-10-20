import webpack from 'webpack';
import path from 'path';
import replaceExt from 'replace-ext';
import { transformExtension } from '../utils/transformExtension';
import { GojiWebpackPluginRequiredOptions } from '../types';

export abstract class GojiBasedWebpackPlugin implements webpack.Plugin {
  public constructor(protected options: GojiWebpackPluginRequiredOptions) {}

  public abstract apply(compiler: webpack.Compiler): void;

  protected transformExt(extension: string) {
    return transformExtension({
      extension,
      miniProgramTarget: this.options.target,
    });
  }

  protected transformExtForPath(pathname: string) {
    const ext = path.extname(pathname);
    return replaceExt(pathname, this.transformExt(ext));
  }

  protected isJsExt(ext: string) {
    return this.transformExt('.js') === ext;
  }

  protected isCssExt(ext: string) {
    return this.transformExt('.wxss') === ext;
  }
}
