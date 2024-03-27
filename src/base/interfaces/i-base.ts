export interface RetryPromiseParams {
  params: any;
  func: Function;
  retryCount?: number;
  _currentRetryCount?: number;
  retryDelay?: number; // in ms
}