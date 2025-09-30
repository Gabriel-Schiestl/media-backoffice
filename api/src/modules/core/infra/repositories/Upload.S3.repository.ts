import Upload from '../../domain/entities/Upload';
import UploadRepository from '../../domain/repositories/UploadRepository';
import { Exception } from '../../shared/Exception';
import { Res, Result } from '../../shared/Result';

export default class UploadS3Repository implements UploadRepository {
  async save(upload: Upload): Promise<Result<Exception, string>> {
    try {
      // TODO: Implement actual S3 upload logic here
      console.log('Saving upload to S3:', upload);
      return Res.success('');
    } catch (error: any) {
      return Res.failure(
        new Exception('Error saving upload to S3: ' + error.message),
      );
    }
  }
}
