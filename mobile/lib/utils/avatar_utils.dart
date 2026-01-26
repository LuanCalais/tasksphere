import 'package:flutter/cupertino.dart';

String getImageProfile(dynamic owner) {
  debugPrint('AAAAAAAAAAAAAAAA: $owner');
  final profilePictureUrl = owner?['profilePictureUrl'];
  if (profilePictureUrl != null && profilePictureUrl is String) {
    return profilePictureUrl;
  }
  return '';
}
