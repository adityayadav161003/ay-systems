---
title: System Design Thinking
description: How I make trade-offs and keep projects shippable.
---

When I say “system design”, I mean: can someone else run it, extend it, and trust the output?

I optimize for:

- repeatable runs (config in, artifacts out)
- clear interfaces between steps
- measurable outcomes (accuracy, latency, failures)
- honest trade-offs

A small checklist I use:

1. Inputs + assumptions (data shape, leakage risks, target definition)
2. Baseline first, then complexity
3. Evaluation that matches the real use case
4. Logging + artifacts so results are comparable
5. A path to deployment (model export, versioned configs)

This mindset shows up most in AY Systems and GestureWave — where clarity and repeatability matter as much as the model itself.
