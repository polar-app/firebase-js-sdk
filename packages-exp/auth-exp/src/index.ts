/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

// core/auth
export { initializeAuth } from './core/auth/auth_impl';

// core/persistence
export {
  browserLocalPersistence,
  browserSessionPersistence
} from './core/persistence/browser';
export { inMemoryPersistence } from './core/persistence/in_memory';
export { indexedDBLocalPersistence } from './core/persistence/indexed_db';

// core/providers
export { AnonymousProvider } from './core/providers/anonymous';
export { EmailAuthProvider } from './core/providers/email';
export { PhoneAuthProvider } from './core/providers/phone';

// core/strategies
export { signInAnonymously } from './core/strategies/anonymous';
export {
  signInWithCredential,
  linkWithCredential
} from './core/strategies/credential';
export { signInWithCustomToken } from './core/strategies/custom_token';
export {
  sendPasswordResetEmail,
  confirmPasswordReset,
  checkActionCode,
  verifyPasswordResetCode,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword
} from './core/strategies/email_and_password';
export {
  sendSignInLinkToEmail,
  isSignInWithEmailLink,
  signInWithEmailLink
} from './core/strategies/email_link';
export {
  fetchSignInMethodsForEmail,
  sendEmailVerification
} from './core/strategies/email';
export {
  signInWithPhoneNumber,
  linkWithPhoneNumber
} from './core/strategies/phone';

// core/user
export {
  updateProfile,
  updateEmail,
  updatePassword
} from './core/user/account_info';
export { getIdToken, getIdTokenResult } from './core/user/id_token_result';
export { reload } from './core/user/reload';
export { unlink } from './core/user/unlink';

// model
export { Operation as ActionCodeOperationType } from './model/action_code_info';

// platform-browser/recaptcha
export { RecaptchaVerifier } from './platform_browser/recaptcha/recaptcha_verifier';