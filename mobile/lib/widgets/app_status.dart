import 'package:flutter/material.dart';
import 'package:tasksphere_monitor/models/status_definition.dart';
import 'package:tasksphere_monitor/theme/app_colors.dart';

class AppStatus extends StatelessWidget {
  final String statusValue;
  final bool compact;
  final TextStyle textStyle;

  const AppStatus(
      {required this.statusValue,
      this.compact = false,
      this.textStyle = const TextStyle(fontSize: 14),
      Key? key})
      : super(key: key);

  String _normalizeStatusValue(String value) {
    final raw = value.toString();
    if (raw.contains('.')) {
      return raw.split('.').last;
    }
    return raw;
  }

  @override
  Widget build(BuildContext context) {
    final def =
        taskStatusDefinitionFromValue(_normalizeStatusValue(statusValue));

    final label = def?.label ?? statusValue;
    final borderColor = def?.color ?? Colors.grey.shade800;

    final EdgeInsets padding = compact
        ? const EdgeInsets.symmetric(horizontal: 6, vertical: 2)
        : const EdgeInsets.symmetric(horizontal: 8, vertical: 4);

    return Row(
      mainAxisSize: MainAxisSize.min,
      children: [
        Container(
          padding: padding,
          decoration: BoxDecoration(
            color: Colors.white,
            borderRadius: BorderRadius.circular(4.0),
            border: Border.all(color: borderColor, width: 2),
          ),
          child: Text(
            label,
            style: textStyle.copyWith(color: AppColors.primary, fontSize: 12),
          ),
        ),
      ],
    );
  }
}
