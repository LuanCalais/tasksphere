String getImageProfile(dynamic owner) {
  final profilePictureUrl = owner?['profilePictureUrl'];
  if (profilePictureUrl != null && profilePictureUrl is String) {
    return profilePictureUrl;
  }
  return '';
}
