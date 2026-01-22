import 'package:flutter/material.dart';

class AppDrawer extends StatelessWidget {
  const AppDrawer({Key? key}) : super(key: key);

  void _navigateTo(BuildContext context, String route) {
    Navigator.of(context).pop();
    final current = ModalRoute.of(context)?.settings.name;
    if (current == route) return;
    Navigator.of(context).pushReplacementNamed(route);
  }

  @override
  Widget build(BuildContext context) {
    return Drawer(
      shape: const RoundedRectangleBorder(borderRadius: BorderRadius.zero),
      child: ListView(
        padding: EdgeInsets.zero,
        children: [
          Container(
            width: double.infinity,
            decoration: BoxDecoration(color: Color(0xFFe65f5c)),
            padding: EdgeInsets.only(
                top: MediaQuery.of(context).padding.top + 20,
                bottom: 20,
                left: 20,
                right: 20),
            child: Text(
              'TaskSphere Monitor',
              style: TextStyle(color: Colors.white, fontSize: 20),
            ),
          ),
          ListTile(
              leading: const Icon(Icons.people_rounded),
              title: const Text('Usuários'),
              onTap: () => _navigateTo(context, '/')),
          ListTile(
            leading: const Icon(Icons.work_rounded),
            title: const Text('Projetos'),
            onTap: () => _navigateTo(context, '/projects'),
          )
        ],
      ),
    );
  }
}
