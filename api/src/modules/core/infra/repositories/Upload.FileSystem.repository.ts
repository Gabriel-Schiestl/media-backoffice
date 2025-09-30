import Upload from '../../domain/entities/Upload';
import UploadRepository from '../../domain/repositories/UploadRepository';
import { Exception } from '../../shared/Exception';
import { Res, Result } from '../../shared/Result';

export default class UploadFileSystemRepository implements UploadRepository {
  async save(upload: Upload): Promise<Result<Exception, string>> {
    try {
      // TODO: Implement actual file system upload logic here
      console.log('Saving upload to file system:', upload);
      return Res.success('');
    } catch (error: any) {
      return Res.failure(
        new Exception('Error saving upload to file system: ' + error.message),
      );
    }
  }
}
