class User {
  final int id;
  final String name;
  final String email;
  final String? profilePictureUrl;

  User({required this.id, required this.name, required this.email, this.profilePictureUrl});

  factory User.fromJson(Map<String, dynamic> json) {
    return User(
      id: int.parse(json['id'].toString()),
      name: json['name'] ?? '',
      email: json['email'] ?? '',
      profilePictureUrl: json['profilePictureUrl'],
    );
  }
}