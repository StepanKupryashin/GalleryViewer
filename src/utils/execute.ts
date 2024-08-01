import {Nullable} from '../types';

const execute = async <Res = null>(
  action: () => Promise<Nullable<Res> | void | undefined>,
  onError?: (error: string) => void,
  onFinally?: () => void,
): Promise<Nullable<Res> | void | undefined> => {
  try {
    return await action();
  } catch (e) {
    console.warn(e);
    //todo error handling

    onError?.((e as Error).message);

    return null;
  } finally {
    onFinally?.();
  }
};

export default execute;
