import { Exception } from '../../shared/Exception';
import { Result } from '../../shared/Result';
import Upload from '../entities/Upload';

export default interface UploadRepository {
  save(upload: Upload): Promise<Result<Exception, string>>;
}
